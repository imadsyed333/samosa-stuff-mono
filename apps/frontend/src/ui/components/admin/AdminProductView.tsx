import { Box, Card, Typography } from "@mui/material";
import React from "react";
import { SelectedProductProvider } from "../../../context/SelectProductContext";
import { ProductList } from "../product/ProductList";
import { useProductQuery } from "../../../hooks/useProductQuery";
import AdminProductDialog from "./AdminProductDialog";
import AddProductFab from "./AddProductFab";

export const AdminProductView = () => {
  const { products } = useProductQuery();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        my: 2,
      }}
    >
      <SelectedProductProvider>
        <Card
          variant="outlined"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <Typography variant="h3">Products</Typography>
          <ProductList products={products} />
          <AddProductFab />
        </Card>
        <AdminProductDialog />
      </SelectedProductProvider>
    </Box>
  );
};
