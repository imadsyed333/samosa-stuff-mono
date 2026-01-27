import { Box } from "@mui/material";
import React from "react";
import { useCartQuery } from "../../../hooks/useCartQuery";
import { CartItemCard } from "./CartItemCard";

export const CartTable = () => {
  const { cart } = useCartQuery();

  return (
    <Box
      sx={{
        flex: 1,
        flexDirection: "column",
      }}
    >
      {cart.map((item, key) => (
        <CartItemCard item={item} key={key} />
      ))}
    </Box>
  );
};
