import React from "react";
import { Product } from "../../../lib/types";
import { Box, Typography } from "@mui/material";
import { MenuGrid } from "./MenuGrid";
import { colors } from "../../../lib/themes";

type MenuSectionProps = {
  products: Product[];
  type: string;
};

const MenuSection = ({ products, type }: MenuSectionProps) => {
  const filteredProducts = products.filter((p) => p.name.endsWith(type));
  return (
    <Box>
      <Typography
        variant="h2"
        sx={{
          color: colors.secondary,
          textAlign: "left",
          my: 1,
        }}
      >
        {type}
      </Typography>
      <MenuGrid products={filteredProducts} />
    </Box>
  );
};

export default MenuSection;
