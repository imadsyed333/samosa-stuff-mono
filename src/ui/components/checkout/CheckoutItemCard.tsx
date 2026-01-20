import React from "react";
import { useCartQuery } from "../../../hooks/useCartQuery";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { CartItem } from "../../../lib/types";
import { formatPrice } from "../../../lib/utils";

type CheckoutItemProps = {
  item: CartItem;
};

const CheckoutItemCard = ({ item }: CheckoutItemProps) => {
  return (
    <Card
      sx={{
        flex: 1,
        mx: 1,
        mb: 1,
      }}
      variant="outlined"
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography>
          {item.quantity} x {item.product.name}
        </Typography>
        <Typography>${formatPrice(item.product.price)}</Typography>
      </CardContent>
    </Card>
  );
};

export default CheckoutItemCard;
