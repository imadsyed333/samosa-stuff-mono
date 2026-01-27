import React from "react";
import { useOrderQuery } from "./useOrderQuery";
import { Box, Card, Typography } from "@mui/material";
import { OrderList } from "../order/OrderList";

export const AdminOrderView = () => {
  const { orders } = useOrderQuery();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        my: 2,
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
        variant="outlined"
      >
        <Typography variant="h3">Orders</Typography>
        <OrderList orders={orders} isAdmin={true} />
      </Card>
    </Box>
  );
};
