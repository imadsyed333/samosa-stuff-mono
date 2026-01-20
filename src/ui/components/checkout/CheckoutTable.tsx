import React from "react";
import { useCartQuery } from "../../../hooks/useCartQuery";
import { Box } from "@mui/material";
import CheckoutItemCard from "./CheckoutItemCard";

const CheckoutTable = () => {
  const { cart } = useCartQuery();
  return (
    <Box
      sx={{
        flex: 1,
        flexDirection: "column",
      }}
    >
      {cart.map((item, key) => (
        <CheckoutItemCard item={item} key={key} />
      ))}
    </Box>
  );
};

export default CheckoutTable;
