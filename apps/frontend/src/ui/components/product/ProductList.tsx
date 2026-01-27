import React from "react";
import { Product } from "../../../lib/types";
import { List, ListItem } from "@mui/material";
import { FadeWrapper } from "../FadeWrapper";
import { ProductListCard } from "./ProductListCard";

export const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <FadeWrapper>
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          overflowY: "scroll",
        }}
      >
        {products.map((product, key) => (
          <ListItem key={key}>
            <ProductListCard product={product} />
          </ListItem>
        ))}
      </List>
    </FadeWrapper>
  );
};
