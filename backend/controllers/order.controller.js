const prisma = require("../config/db");
const httpError = require("../middlewares/httpError");
const { verifyPayment } = require("../services/chapaService");

exports.createOrder = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      town,
      country,
      region,
      kebele,
      woreda,
      accountId,
      items,
      totalAmount,
      paymentMethod,
      shopId
    } = req.body;
    const account = await prisma.account.findFirst({ where: { email } });
    for (const item of items) {
      const product = await prisma.product.findFirst({
        where: { id: item.productId },
        select: { quantity: true }
      });
      console.log(items, product)


    }
    // Transaction: Create location, order, and order items
    const newOrder = await prisma.$transaction(async (tx) => {
      let location = await tx.location.findFirst({
        where: {
          town,
          country,
          region,
          kebele,
          woreda
        },
      });
      if (!location) {
        // 1. Create the location from form fields
        location = await tx.location.create({
          data: {
            town,
            country,
            region,
            kebele,
            woreda,
          },
        });
      }
      let customer = await tx.customer.findFirst({
        where: {
          accountId: account?.id
        }
      })
      if (!customer) {
        customer = await tx.customer.create({
          data: {
            accountId: account.id,
            locationId: location.id
          }
        })
      }
      for (const item of items) {
        const product = await tx.product.findFirst({
          where: { id: item.productId },
          select: { quantity: true }
        });
        console.log(items, product)

        // Deduct stock
        await tx.product.update({
          where: { id: item.productId },
          data: {
            quantity: { decrement: item.quantity }
          }
        });
      }
      // 2. Create the order and items
      const order = await tx.order.create({
        data: {
          customer: {
            connect: { accountId }, // assuming Customer is linked to Account
          },
          shop: {
            connect: { id: shopId }, // or use another way to get shopId if needed
          },
          account: {
            connect: { id: accountId }
          },
          location: {
            connect: { id: location.id }
          },
          totalAmount,
          paymentMethod,
          status: "PENDING",
          items: {
            create: items.map((item) => ({
              productId: item.productId,
              price: item.price,
              quantity: item.quantity,
              name: `Product ${item.productId}`
            })),
          },
        },
        include: {
          items: true,
          location: true
        }
      });

      return order;
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      order: newOrder
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Order creation failed.",
      error: error.message
    });
  }
};

// payment call back
exports.verifyOrderPayment = async (req, res) => {
  const { tx_ref } = req.query;
  try {
    const chapaRes = await verifyPayment(tx_ref);
    console.log(chapaRes, ' on backend is excusted')
    const isSuccess =
      chapaRes.status === "success" &&
      chapaRes.data.status === "success";

    const custom_order_id = chapaRes.data?.meta?.orderId;
    const paymentReference = chapaRes.data?.meta?.tx_ref;

    if (isSuccess) {
      console.log(chapaRes, ' on backend is true')

      // 1. Update the order
      await prisma.order.update({
        where: { id: custom_order_id },
        data: {
          status: "SHIPPED",
          paymentMethod: paymentReference
        },
      });
      return res.redirect(`${process.env.FRONTEND_BASE_URL}/customers/order-confirmation?success=true&tx_ref=${tx_ref}`);
    }
    await prisma.order.update({
      where: { id: custom_order_id },
      data: { status: "CANCELLED" },
    });
    console.log(chapaRes, ' on backend is false')
    return res.redirect(`${process.env.FRONTEND_BASE_URL}/customers/order-confirmation?success=false`);
  } catch (error) {
    console.error("Error verifying payment:", error.message);
    return res.redirect(`${process.env.FRONTEND_BASE_URL}/customers/order-confirmation?success=false`);
  }
};
// payment for frontend back
exports.verifyOrderPaymentForFrontend = async (req, res, next) => {
  const { tx_ref } = req.query;
  let backedResponse = {}
  try {
    const chapaRes = await verifyPayment(tx_ref);
    console.log(chapaRes, ' on backend is excusted')
    const isSuccess =
      chapaRes.status === "success" &&
      chapaRes.data.status === "success";
    const orderId = chapaRes.data?.meta?.orderId;
    const order = await prisma.order.findFirst({
      where: {
        id: orderId
      },
      include: {
        shop: {
          include: {
            merchant: {
              include: {
                account: true
              }
            }
          }
        }
      }
    });

    // Create notifications for each merchant
    await prisma.notification.create({
      data: {
        userId: order.shop.merchant.accountId, // Account.id of merchant
        type: 'NEW_ORDER',
        message: 'You have a new order!',
        metadata: JSON.stringify({ orderId }),
      },
    });


    backedResponse = {
      ...chapaRes,
      logoUrl: order.shop.logoImageUrl,
      shopName: order.shop.name,
      shopOwner: order.shop.merchant.ownerName,


    }
    console.log(backedResponse, 'bakenddddres')
    res.status(200).json(backedResponse)
  } catch (error) {
    console.error("Error verifying payment:", error.message);
    next(new httpError(error.message, 500))
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    // Get all orders with necessary relations
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        customer: {
          include: {
            account: true
          }
        },
        shop: {
          select: {
            name: true,
            logoImageUrl: true,
            id:true
          }
        },
        location: true, 
        items: true
      },
    });
    // Fetch product details for all items in all orders
    const allProductIds = [...new Set(
      orders.flatMap(order =>
        order.items.map(item => item.productId)
      )
    )];

    const products = await prisma.product.findMany({
      where: {
        id: { in: allProductIds }
      },
      select: {
        id: true,
        name: true,
        images: true,
        category: true,
        brand: true,
        price: true,
        discountPrice: true
      }
    });

    // Create a product map for quick lookup
    const productMap = products.reduce((map, product) => {
      map[product.id] = product;
      return map;
    }, {});

    // Transform the data for the orders table
    const formattedOrders = orders.map(order => ({
      id: order.id,
      items: order.items.map(item => ({
        ...item,
        product: productMap[item.productId] || null
      })),
      status: order.status,
      totalAmount: order.totalAmount,
      createdAt: order.createdAt,
      customer: {
        name: `${order.customer.account.firstName} ${order.customer.account.lastName}`,
        email: order.customer.account.email
      },
      shop: {
        name: order.shop.name,
        logo: order.shop.logoImageUrl
      },
      location: {
        town: order.location.town,
        country: order.location.country
      }
    }));

    // Generate performance data for the chart
    const currentYear = new Date().getFullYear();
    const performanceData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: currentYear.toString(),
          data: Array(7).fill(0),
          backgroundColor: 'rgba(99, 102, 241, 0.8)',
        },
        {
          label: (currentYear - 1).toString(),
          data: Array(7).fill(0),
          backgroundColor: 'rgba(209, 213, 219, 0.8)',
        }
      ]
    };

    // Populate the performance data with actual order counts
    orders.forEach(order => {
      const orderDate = new Date(order.createdAt);
      const month = orderDate.getMonth();
      const year = orderDate.getFullYear();

      if (month < 7) {
        if (year === currentYear) {
          performanceData.datasets[0].data[month]++;
        } else if (year === currentYear - 1) {
          performanceData.datasets[1].data[month]++;
        }
      }
    });

    res.status(200).json({
      success: true,
      count: formattedOrders.length,
      orders: formattedOrders,
      performance: performanceData,
      stats: {
        totalOrders: formattedOrders.length,
        pendingOrders: formattedOrders.filter(o => o.status === 'PENDING').length,
        completedOrders: formattedOrders.filter(o => o.status === 'DELIVERED').length,
        totalRevenue: formattedOrders.reduce((sum, order) => sum + order.totalAmount, 0)
      }
    });
  } catch (error) {
    console.error('Failed to fetch orders:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching orders',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
exports.getOrdersByCustomerId = async (req, res) => {
  const { accountId } = req.params;
  try {
    const orders = await prisma.order.findMany({
      where: {
        accountId
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        account: true,
        items: true,
      },
    });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders: orders || [],
    });
  } catch (error) {
    console.error('Error fetching orders by accountId:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching orders',
    });
  }
};

exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Order ID is required'
    });
  }
  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        customer: {
          include: {
            account: true
          }
        },
        shop: {
          select: {
            name: true,
            logoImageUrl: true
          }
        },
        location: true,
        items: true
      }
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Get all unique product IDs from order items
    const productIds = [...new Set(order.items.map(item => item.productId))];

    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds }
      },
      select: {
        id: true,
        name: true,
        images: true,
        category: true,
        brand: true,
        price: true,
        discountPrice: true
      }
    });

    const productMap = products.reduce((map, product) => {
      map[product.id] = product;
      return map;
    }, {});

    const formattedOrder = {
      id: order.id,
      createdAt: order.createdAt,
      status: order.status,
      paymentMethod: order.paymentMethod,
      paymentStatus: 'PAID',
      customer: {
        name: `${order.customer.account.firstName} ${order.customer.account.lastName}`,
        email: order.customer.account.email,
      },
      shippingAddress: {
        kebele: order.location.kebele,
        woreda: order.location.woreda,
        town: order.location.town,
        region: order.location.region,
        country: order.location.country
      },
      subtotal: order.totalAmount - 19,
      shippingCost: 19,
      total: order.totalAmount,
      items: order.items.map(item => ({
        id: item.id,
        product: productMap[item.productId] ? {
          name: productMap[item.productId].name,
          images: productMap[item.productId].images,
          price: productMap[item.productId].price,
          discountPrice: productMap[item.productId].discountPrice
        } : {
          name: item.name || 'Unknown Product',
          images: ['/placeholder-product.png'],
          price: item.price,
          discountPrice: null
        },
        quantity: item.quantity,
        price: item.price
      }))
    };

    res.status(200).json({
      success: true,
      order: formattedOrder
    });
  } catch (error) {
    console.error('Error fetching order by ID:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching order',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Validate the status
    const validStatuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    // Update the order status
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
      include: {
        customer: {
          include: {
            account: true
          }
        }
      }
    });

    // Create a notification for the customer
    await prisma.notification.create({
      data: {
        userId: updatedOrder.customer.accountId,
        type: 'ORDER_STATUS_UPDATE',
        message: `Your order #${updatedOrder.id} status has been updated to ${status}`,
        metadata: JSON.stringify({
          orderId: updatedOrder.id,
          newStatus: status
        })
      }
    });

    // TODO: Add email notification logic here if needed

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      order: updatedOrder
    });
  } catch (error) {
    console.error('Error updating order status:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    // First verify the order exists
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        customer: {
          include: {
            account: true
          }
        },
        items: true
      }
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if order can be deleted (business rules)
    if (order.status === 'SHIPPED' || order.status === 'DELIVERED') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete already shipped or delivered orders'
      });
    }

    // Create a transaction to handle all related deletions
    const deletedOrder = await prisma.$transaction([
      // Delete all order items first
      prisma.orderItem.deleteMany({
        where: { orderId: id }
      }),
      // Delete any payments associated
      prisma.payment.deleteMany({
        where: { orderId: id }
      }),
      // Then delete the order itself
      prisma.order.delete({
        where: { id }
      })
    ]);

    // Create notification for customer
    await prisma.notification.create({
      data: {
        userId: order.customer.accountId,
        type: 'ORDER_DELETED',
        message: `Your order #${order.id} has been cancelled`,
        metadata: JSON.stringify({
          orderId: order.id,
          orderTotal: order.totalAmount
        })
      }
    });
    res.status(200).json({
      success: true,
      message: 'Order deleted successfully',
      orderId: id
    });

  } catch (error) {
    console.error('Error deleting order:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to delete order',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};