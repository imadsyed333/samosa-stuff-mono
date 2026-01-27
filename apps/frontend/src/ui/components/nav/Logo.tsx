import { Box, Typography } from "@mui/material";
import React from "react";

export const Logo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        alignItems: "center",
        justifySelf: "flex-start",
      }}
    >
      <Box
        component={"img"}
        src="/logo.png"
        alt="logo"
        sx={{
          height: "90%",
          mr: 1,
        }}
      />
    </Box>
  );
};
