import { ShoppingCart } from "@mui/icons-material";
import { Card, CardActionArea, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useCartQuery } from "../../../hooks/useCartQuery";
import { colors } from "../../../lib/themes";

export const CartButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(false);

  const { cart = [] } = useCartQuery();

  useEffect(() => {
    location.pathname === "/cart" ? setSelected(true) : setSelected(false);
  }, [location.pathname]);

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        m: 1,
        backgroundColor: !selected
          ? "rgba(255, 255, 255, 0)"
          : "rgba(255, 255, 255, 1)",
        boxShadow: "none",
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          px: 3,
        }}
        onClick={() => {
          navigate("/cart");
        }}
      >
        <ShoppingCart
          sx={{
            color: selected ? colors.secondary : colors.primary,
            fontSize: 30,
            mr: 1,
          }}
        />
        <Typography
          sx={{
            color: selected ? colors.secondary : colors.primary,
            fontSize: 25,
            mb: 1,
          }}
        >
          ({cart.length})
        </Typography>
      </CardActionArea>
    </Card>
  );
};
