import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useProductQuery } from "../../hooks/useProductQuery";
import MenuSection from "../components/menu/MenuSection";

export const Menu = () => {
  const { isPending, isError, products, isSuccess } = useProductQuery();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mx: 2,
        flexGrow: 1,
      }}
    >
      {isPending && <CircularProgress />}
      {isError && <Typography>Menu could not be loaded</Typography>}
      {isSuccess && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
          }}
        >
          <MenuSection products={products} type="Samosa" />
          <MenuSection products={products} type="Kabab" />
        </Box>
      )}
    </Box>
  );
};
