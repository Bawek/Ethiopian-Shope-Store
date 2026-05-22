const prisma = require("../config/db")
const httpError = require("../middlewares/httpError")

const createProduct = async (req, res, next) => {
    const {
        name,
        description,
        price,
        discountPrice,
        quantity,
        category,
        status = 'PENDING',
        brand,
        accountId
    } = req.body;

    try {
        // Validate required fields
        const requiredFields = ['name', 'price', 'quantity', 'category', 'accountId'];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return next(new httpError(
                `Missing required fields: ${missingFields.join(', ')}`,
                400
            ));
        }
        // Check for images (now using req.files instead of req.file)
        if (!req.files || req.files.length === 0) {
            return next(new httpError("At least one product image is required", 400));
        }

        // Validate numeric fields
        if (isNaN(price) || isNaN(quantity) || (discountPrice && isNaN(discountPrice))) {
            return next(new httpError("Price and quantity must be valid numbers", 400));
        }

        // Check merchant and shops
        const merchant = await prisma.merchant.findFirst({
            where: { accountId },
            include: { shops: true },
        });

        if (!merchant.shops || merchant.shops.length === 0) {
            return next(new httpError("Merchant has no shops to associate with product", 400));
        }

        // Check for existing product
        const existingProduct = await prisma.product.findFirst({
            where: {
                name: { equals: name, mode: 'insensitive' },
                shopId: merchant.shops[0].id
            }
        });

        if (existingProduct) {
            return next(new httpError("Product with this name already exists in your shop", 409));
        }

        // Process multiple images
        const imageFilenames = req.files.map(file => file.filename);

        // Calculate final discount price
        const numericPrice = parseFloat(price);
        const finalDiscountPrice = discountPrice ?
            Math.round(numericPrice * (parseFloat(discountPrice) / 100)) :
            null;

        // Create the product with multiple images
        const newProduct = await prisma.product.create({
            data: {
                name,
                description,
                price: numericPrice,
                discountPrice: finalDiscountPrice,
                quantity: parseInt(quantity),
                category,
                status,
                images: imageFilenames, // Now storing array of filenames
                brand,
                shopId: merchant.shops[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });

        return res.status(201).json({
            message: 'Product created successfully with multiple images',
            status: "success",
            product: newProduct,
        });

    } catch (error) {
        console.error('Product Creation Error:', error);

        // Handle specific errors
        if (error.name === 'NotFoundError') {
            return next(new httpError("Merchant account not found", 404));
        }

        if (error.code === 'P2002') {
            return next(new httpError("Product with similar attributes already exists", 409));
        }

        next(new httpError(
            error.message || 'Failed to create product',
            error.statusCode || 500
        ));
    }
};
const getAllProducts = async (req, res, next) => {
    try {
        const products = await prisma.product.findMany()
        return res.status(201).json({
            status: "success",
            products,
        });
    } catch (error) {
        console.log('Register Merchant Error', error)
        next(new httpError(error.message, 500))
    }

}
const getAllProductsForSale = async (req, res, next) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                status: 'ACTIVE'
            }
        })
        if (products.length === 0) {
            return res.status(201).json({
                status: "success",
                products: [],
            });
        }
        return res.status(201).json({
            status: "success",
            products,
        });
    } catch (error) {
        console.log('Register Merchant Error', error)
        next(new httpError(error.message, 500))
    }

}
const getProductById = async (req, res, next) => {
    const { id } = req.params
    console.log(id, 'product id')
    try {
        const product = await prisma.product.findUnique({
            where: {
                id
            }
        })
        if (!product) return next(new httpError("Sorry No Product with this Id.", 404))

        // Success: Return the newly created account
        return res.status(200).json({
            status: "success",
            product,
        });
    } catch (error) {
        console.log('Register Merchant Error', error)
        next(new httpError(error.message, 500))
    }

}
const getProductByShopId = async (req, res, next) => {
    const { shopId } = req.params;

    try {
        if (!shopId) {
            return res.status(400).json({
                status: "fail",
                message: "Shop ID is required.",
            });
        }

        const products = await prisma.product.findMany({
            where: {
                shopId,
                status: 'ACTIVE',
            },
            include: {
                shop: true
            },
        });

        return res.status(200).json({
            status: "success",
            count: products.length,
            products,
        });
    } catch (error) {
        console.error('Get Products Error:', error);
        next(new httpError("Internal server error while fetching products.", 500));
    }
};

const deleteProductById = async (req, res, next) => {
    const { id } = req.params;
    try {
        // First delete all cart items that reference this product
        await prisma.cartItem.deleteMany({
            where: {
                productId: id
            }
        });

        // Then delete the product
        await prisma.product.delete({
            where: {
                id
            }
        });

        return res.status(204).json({
            status: "success",
            message: 'Product Successfully Deleted',
        });
    } catch (error) {
        console.log('Delete Product Error', error);
        next(new httpError(error.message, 500));
    }
};
const updateProductById = async (req, res, next) => {
    const {
        name,
        description,
        price,
        discountPrice,
        quantity,
        category,
        status,
        brand,
        shopId,
        accountId,
        deletedImages = [],
        id
    } = req.body;

    try {
        // Validate required fields
        if (!id) {
            return next(new httpError("Product ID is required for update.", 400));
        }

        // Check if product exists
        const existingProduct = await prisma.product.findUnique({
            where: { id }
        });

        if (!existingProduct) {
            return next(new httpError("Product not found", 404));
        }

        // Process images
        let updatedImages = [...existingProduct.images];

        // Handle deleted images
        if (deletedImages && deletedImages.length > 0) {
            updatedImages = updatedImages.filter(img => !deletedImages.includes(img));
            // Here you would also delete the actual image files from storage
        }

        // Add new images if any
        if (req.files && req.files.length > 0) {
            const newImages = req.files.map(file => file.filename);
            updatedImages = [...updatedImages, ...newImages];
        }

        // Prepare update data
        const updateData = {
            name: name || existingProduct.name,
            description: description || existingProduct.description,
            price: price ? Number(price) : existingProduct.price,
            discountPrice: discountPrice ?
                Number(price) * (Number(discountPrice) / 100) :
                existingProduct.discountPrice,
            quantity: quantity ? Number(quantity) : existingProduct.quantity,
            category: category || existingProduct.category,
            status: status || existingProduct.status,
            brand: brand || existingProduct.brand,
            images: updatedImages, // Updated images array
            updatedAt: new Date()
        };

        // Perform the update
        const updatedProduct = await prisma.product.update({
            where: { id },
            data: updateData
        });

        // Return success response
        return res.status(200).json({
            message: 'Product updated successfully',
            status: "success",
            product: updatedProduct,
        });

    } catch (error) {
        console.error('Product Update Error:', error);

        // Handle Prisma specific errors
        if (error.code === 'P2025') {
            return next(new httpError("Product not found", 404));
        }

        next(new httpError(
            error.message || 'An error occurred while updating the product',
            error.statusCode || 500
        ));
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    getAllProductsForSale,
    getProductByShopId
}
