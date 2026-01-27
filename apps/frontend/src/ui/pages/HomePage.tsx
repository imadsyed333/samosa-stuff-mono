import React from "react";
import { Box, Typography } from "@mui/material";

export const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h1">Welcome</Typography>
      <Typography variant="h6">
        We make crazy good samosas. And other stuff.
      </Typography>
    </Box>
  );
};
