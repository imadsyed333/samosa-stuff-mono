import { CheckCircleOutline } from "@mui/icons-material";
import { Box, Icon, Typography } from "@mui/material";
import React from "react";

export const CheckoutSuccessPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CheckCircleOutline
        color="success"
        sx={{
          fontSize: 130,
          mb: 2,
        }}
      />
      <Typography variant="h4">
        Your order has been placed! Go to your Profile to check it out!
      </Typography>
    </Box>
  );
};
