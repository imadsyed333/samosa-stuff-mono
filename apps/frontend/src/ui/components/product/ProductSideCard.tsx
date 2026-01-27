import { Box, Button, Card, Typography } from "@mui/material";
import React, { useState } from "react";
import { formatPrice } from "../../../lib/utils";
import { IncrementalButton } from "../IncrementalButton";
import { Product } from "../../../lib/types";
import { useCartActions } from "../../../hooks/useCartActions";
import { colors } from "../../../lib/themes";

export const ProductSideCard = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartActions();
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        width: "fit-content",
        p: 2,
        alignItems: "center",
      }}
      variant="outlined"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "start",
          mt: 2,
          color: colors.secondary,
        }}
      >
        <Typography variant="h4">{product.name}</Typography>
        <Typography variant="h6">
          ${formatPrice(product.price!)} / item
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: colors.secondary,
          }}
        >
          {product.description}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
        }}
      >
        <IncrementalButton
          value={quantity}
          onChange={(qty: number) => setQuantity(qty)}
        />
        <Button
          variant="contained"
          sx={{
            mt: 2,
            width: "100%",
            backgroundColor: colors.tertiary,
          }}
          onClick={() => addToCart(product, quantity)}
        >
          <Typography
            variant="h6"
            sx={{
              color: colors.primary,
            }}
          >
            Add to Cart
          </Typography>
        </Button>
      </Box>
    </Card>
  );
};
