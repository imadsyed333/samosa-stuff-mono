import { Box, CardActionArea, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext, useAuth } from "../../../context/AuthContext";
import { AccountMenu } from "./AccountMenu";
import { ShoppingCart } from "@mui/icons-material";
import { CartButton } from "./CartButton";

export const AccountLinks = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <CartButton />
      <AccountMenu />
    </Box>
  );
};
