import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { CartTable } from "../components/cart/CartTable";
import { ShoppingCart } from "@mui/icons-material";
import { formatPrice } from "../../lib/utils";
import { useCartQuery } from "../../hooks/useCartQuery";
import { colors } from "../../lib/themes";
import { useNavigate } from "react-router";

export const Cart = () => {
  const { cart, isPending } = useCartQuery();

  const navigate = useNavigate();

  const cartTotal = cart.reduce(
    (sum, item) => item.product.price * item.quantity + sum,
    0,
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        my: 2,
      }}
    >
      {isPending && <CircularProgress />}
      {cart.length === 0 && !isPending && (
        <Box>
          <ShoppingCart
            sx={{
              color: colors.secondary,
              fontSize: 100,
            }}
          />
          <Typography variant="h4">Your cart is empty.</Typography>
        </Box>
      )}
      {cart.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                mb: 2,
              }}
            >
              Cart
            </Typography>
            <Divider
              variant="middle"
              sx={{
                color: colors.secondary,
                opacity: 1,
              }}
            />
            <CartTable />
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                my: 1,
              }}
            >
              <Typography variant="h5">Total:</Typography>
              <Typography variant="h5">${formatPrice(cartTotal)}</Typography>
            </Box>
            <Button
              variant="contained"
              size="large"
              sx={{
                display: "flex",
                backgroundColor: colors.button.primary,
              }}
              onClick={() => navigate("/checkout")}
              disabled={cart.length < 1}
            >
              <Typography
                sx={{
                  color: colors.primary,
                }}
                variant="h5"
              >
                Proceed to Checkout
              </Typography>
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};
