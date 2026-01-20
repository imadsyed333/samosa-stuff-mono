import { Delete } from "@mui/icons-material";
import { Box, Card, IconButton, Typography } from "@mui/material";
import React from "react";
import { CartItem } from "../../../lib/types";
import { formatPrice } from "../../../lib/utils";
import { IncrementalButton } from "../IncrementalButton";
import { useCartActions } from "../../../hooks/useCartActions";
import { colors } from "../../../lib/themes";

type CartItemProps = {
  item: CartItem;
};

export const CartItemCard = ({ item }: CartItemProps) => {
  const { deleteItem, updateQuantity } = useCartActions();

  return (
    <Card
      sx={{
        display: "flex",
        mx: 1,
        mb: 1,
        py: 1,
      }}
      variant="outlined"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <IconButton
          onClick={() => deleteItem(item.id)}
          sx={{
            ml: 1,
          }}
        >
          <Delete
            sx={{
              color: colors.button.delete,
            }}
            fontSize="small"
          />
        </IconButton>
        <Typography>{item.product.name}</Typography>
        <Box
          sx={{
            px: 1,
          }}
        >
          <IncrementalButton
            value={item.quantity}
            onChange={(qty: number) => updateQuantity(item.id, qty)}
          />
        </Box>
        <Typography sx={{ pr: 2 }}>
          ${formatPrice(item.product.price)}
        </Typography>
      </Box>
    </Card>
  );
};
