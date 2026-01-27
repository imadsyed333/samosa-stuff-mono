import React from "react";
import { OrderItem } from "../../../lib/types";
import { Card, Typography } from "@mui/material";
import { formatPrice } from "../../../lib/utils";

export const OrderItemCard = ({ orderItem }: { orderItem: OrderItem }) => {
  const { quantity, product, subtotal } = orderItem;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        p: 1,
      }}
      variant="outlined"
    >
      <Typography variant="h6">{quantity}</Typography>
      <Typography variant="h6">{product.name}</Typography>
      <Typography variant="h6">${formatPrice(subtotal)}</Typography>
    </Card>
  );
};
