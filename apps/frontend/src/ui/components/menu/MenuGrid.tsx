import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React from "react";
import { ProductCard } from "../product/ProductCard";
import { useProductQuery } from "../../../hooks/useProductQuery";

export const MenuGrid = () => {
  const { isPending, isError, products, isSuccess } = useProductQuery();

  return (
    <>
      {isPending && <CircularProgress />}
      {isError && <Typography>Menu could not be loaded.</Typography>}
      {isSuccess && (
        <Grid
          container
          columns={{ xs: 1, sm: 4 }}
          columnSpacing={2}
          rowSpacing={2}
        >
          {isSuccess &&
            products.map((product, index) => (
              <Grid key={index} size={1}>
                <ProductCard product={product} />
              </Grid>
            ))}
        </Grid>
      )}
    </>
  );
};
