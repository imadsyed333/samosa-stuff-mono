import React from "react";
import { Product } from "../../../lib/types";
import { Card, CardActionArea, Typography } from "@mui/material";
import { useSelectedProduct } from "../../../context/SelectProductContext";
import { formatPrice } from "../../../lib/utils";

export const ProductListCard = ({ product }: { product: Product }) => {
  const { setSelectedProduct, setOpen } = useSelectedProduct();
  return (
    <Card
      sx={{
        display: "flex",
        width: "100%",
      }}
      variant="outlined"
    >
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
        onClick={() => {
          setSelectedProduct(product);
          setOpen(true);
        }}
      >
        <Typography variant="h5">{product.name}</Typography>
        <Typography variant="h6">${formatPrice(product.price)}</Typography>
      </CardActionArea>
    </Card>
  );
};
