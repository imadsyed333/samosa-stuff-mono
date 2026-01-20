import {
  Box,
  Button,
  Card,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import CheckoutTable from "../components/checkout/CheckoutTable";
import { useCartQuery } from "../../hooks/useCartQuery";
import { formatPrice } from "../../lib/utils";

const CheckoutPage = () => {
  const { cart } = useCartQuery();
  const navigate = useNavigate();

  const cartTotal = cart.reduce(
    (sum, item) => item.product.price * item.quantity + sum,
    0,
  );

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "space-between",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography variant="h3" sx={{ my: 2 }}>
          Checkout
        </Typography>
        <CheckoutTable />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Divider></Divider>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mx: 1,
          }}
        >
          <Typography variant="h5">Total:</Typography>
          <Typography variant="h5">${formatPrice(cartTotal)}</Typography>
        </Box>
        <Card
          variant="outlined"
          sx={{
            m: 1,
            p: 1,
          }}
        >
          <TextField
            label="Phone Number"
            sx={{
              flex: 1,
            }}
          />
          <Box
            sx={{
              flex: 1,
              mt: 1,
            }}
          >
            <Button
              variant="outlined"
              sx={{
                flex: 1,
                mr: 1,
              }}
              onClick={() => navigate("/cart")}
            >
              Back to Cart
            </Button>
            <Button
              sx={{
                flex: 1,
              }}
              variant="contained"
              onClick={() => navigate("/checkout/success")}
            >
              Checkout
            </Button>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default CheckoutPage;
