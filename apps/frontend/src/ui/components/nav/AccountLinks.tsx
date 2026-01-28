import { Box } from "@mui/material";
import React from "react";
import { AccountMenu } from "./AccountMenu";
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
