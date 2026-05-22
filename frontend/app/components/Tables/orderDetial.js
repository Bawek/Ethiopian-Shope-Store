import React, { useState } from "react";
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid2';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/CheckCircleOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Lottie from "react-lottie";
import correct from "./correct.json";
import {
  CardContent,
  Divider,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { formatDate } from "@/util/formateDate";

const steps = ["PLACED", "CONFIRMED", "PACKING", "DISPATCHED", "DELIVERED"];
const price = [
  {
    product: "Perfume",
    delivery: 30,
    subtotal: 230,
    total: 260,
  },
];
const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: correct,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function Order({ order }) {
  const [isStopped, setIsStopped] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Calculate total amount with shipping cost
  const totalAmount = parseFloat(order.total_amount) || 0;
  const shippingCost = parseFloat(order.shipping_option.cost) || 0;
  const totalAmountWithShipping = totalAmount + shippingCost;

  return (
    <div>
      <Container maxWidth="xl">
        <Grid container spacing={0} m={1}>
          <Grid xs={8}>
            <Box
              sx={{
                width: 1,
                height: 1,
                backgroundColor: "#219C90",
                padding: 2,
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Typography
                variant="h3"
                textAlign={"center"}
                p={3}
                color={"white"}
                fontWeight={"bold"}
              >
                Order Detail
              </Typography>
              <Lottie
                options={defaultOptions}
                height={150}
                width={150}
                isStopped={isStopped}
                isPaused={isPaused}
              />
              <Typography
                variant="body1"
                textAlign={"center"}
                p={2}
                color={"white"}
              >
                <br></br>
                Thank you for ordering
                <Typography
                  variant="body2"
                  textAlign={"center"}
                  p={0}
                  color={"white"}
                >
                  We will be sending you an email confirmation to
                  xyz.tekjar@gmil.com soon!
                </Typography>
              </Typography>

              <Card sx={{ maxWidth: 1, margin: 2 }}>
                <CardContent>
                  <Typography
                    variant="body2"
                    textAlign={"center"}
                    color={"white"}
                  >
                    Order <b>{order.id}</b> was placed on{" "}
                    <b>{formatDate(order.order_date)}</b> and is currently in
                    progress
                  </Typography>
                  <Stepper activeStep={0} sx={{ maxWidth: 1 }} alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </CardContent>
              </Card>
              <Divider />
              <Typography
                variant="body1"
                p={2}
                color={"white"}
                textAlign={"center"}
              >
                Expected Delivery Date - {formatDate(order.order_date)}
              </Typography>
            </Box>
          </Grid>
          <Grid xs={4}>
            <Box
              sx={{
                width: 1,
                height: 1,
              }}
            >
              <Typography variant="h6" m={1}>
                <LocalShippingIcon /> DELIVERY ADDRESS
              </Typography>
              <Divider variant="middle" />
              <Typography variant="body2" pl={2} pt={0.5} pb={0.5}>
                {order.customer.address1}, {order.customer.address2},<br></br>
                {order.customer.city},<br></br>
                {order.customer.state}
              </Typography>
              <Divider variant="fullWidth" />
              <Typography variant="h6" m={1}>
                <ReceiptLongIcon /> Order Status
              </Typography>
              <Divider variant="middle" />
              <Box
                sx={{
                  padding: 1,
                  borderRadius: 1,
                  backgroundColor: "#f5f5f5",
                  boxShadow: 1,
                  margin: 1,
                }}
              >
                <Typography variant="body2" pl={2} pt={0.5} pb={0.5}>
                  <b>Payment Status:</b> {order.payment_status} <br></br>
                  <b>Order Status:</b> {order.order_status} <br></br>
                  <b>Payment Method:</b> {order.payment_method}
                </Typography>
              </Box>
              <Divider variant="fullWidth" />
              <Typography variant="h6" m={1}>
                <ContactMailIcon /> CONTACT DETAIL
              </Typography>
              <Divider variant="middle" />
              <Typography variant="body2" pl={2} pt={0.5} pb={0.5}>
                xyz.tejkar@gmail.com
              </Typography>
              <Typography variant="body2" pl={2} pt={0.5} pb={0.5}>
                {order.customer.phone_number}
              </Typography>
              <Divider variant="fullWidth" />
              <TableContainer>
                <Table sx={{ maxWidth: 1 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" colSpan={2}>
                        <Typography variant="h5">Price Details</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {price.map((element) => (
                      <TableRow key={element.product}>
                        <TableCell>Quantity</TableCell>
                        <TableCell>+{order.order_items.length} ETB </TableCell>
                      </TableRow>
                    ))}
                    {price.map((element) => (
                      <TableRow key={element.product}>
                        <TableCell>Sub Total</TableCell>
                        <TableCell>{order.total_amount} ETB </TableCell>
                      </TableRow>
                    ))}
                    {price.map((element) => (
                      <TableRow key={element.product}>
                        <TableCell>Shipping Cost</TableCell>
                        <TableCell>{order.shipping_option.cost} ETB </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell>
                        <Typography variant="h5">Total Amount</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h5" color="primary">
                          {totalAmountWithShipping?.toFixed(2)} ETB
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Order;
