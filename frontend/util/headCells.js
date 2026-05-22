const orderHeadCells = [
  { id: "product", numeric: false, disablePadding: false, label: "Product" },
  { id: "status", numeric: false, disablePadding: false, label: "Status" },
  {
    id: "paymentStatus",
    numeric: false,
    disablePadding: false,
    label: "Payment Status",
  },
  {
    id: "payment",
    numeric: false,
    disablePadding: false,
    label: "Payment Method",
  },
  {
    id: "shippingMethod",
    numeric: false,
    disablePadding: false,
    label: "Shipping Method",
  },
  { id: "amount", numeric: false, disablePadding: false, label: "Amount" },
  { id: "date", numeric: false, disablePadding: false, label: "Date" },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "Actions",
    renderCell: (params) => {
      return (
        <div>
          <Button
            onClick={(e) => onButtonClick(e, params.row)}
            variant="contained"
            color="primary"
          >
            Edit
          </Button>
          <Button
            onClick={(e) => onButtonClick(e, params.row)}
            variant="contained"
            color="secondary"
            style={{ marginLeft: "8px" }}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];

const productHeadCells = [
  {
    id: "productName",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "productDescription",
    numeric: false,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "productCategory",
    numeric: false,
    disablePadding: false,
    label: "Category",
  },
  { id: "price", numeric: false, disablePadding: false, label: "Price" },
  {
    id: "inventoryStatus",
    numeric: false,
    disablePadding: false,
    label: "Stock",
  },
  { id: "images", numeric: false, disablePadding: false, label: "Images" },

  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "Actions",
  },
];

export { orderHeadCells, productHeadCells };
