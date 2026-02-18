import { Grid } from "@mui/material";
import React from "react";
import { ProductCard } from "../product/ProductCard";
import { Product } from "../../../lib/types";

type MenuGridProps = {
  products: Product[];
};

export const MenuGrid = ({ products }: MenuGridProps) => {
  return (
    <Grid container columns={{ xs: 1, sm: 4 }} columnSpacing={2} rowSpacing={2}>
      {products.map((product, index) => (
        <Grid key={index} size={1}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};
