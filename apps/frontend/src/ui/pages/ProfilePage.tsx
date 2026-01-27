import React from "react";
import { Box, Card, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getUserOrders } from "../../api/orderClient";
import { OrderList } from "../components/order/OrderList";

export const Profile = () => {
  const {
    isSuccess,
    isError,
    isPending,
    data: orders = [],
    error,
  } = useQuery({
    queryKey: ["user_orders"],
    queryFn: getUserOrders,
  });
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        minHeight: 0,
        my: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isError && (
        <Typography variant="h3">Error fetching your orders</Typography>
      )}
      {isPending && <CircularProgress />}
      {isSuccess && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            variant="outlined"
            sx={{
              display: "flex",
              height: "100%",
              width: "100%",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Typography variant="h3">My Orders</Typography>
            <OrderList orders={orders} />
          </Card>
        </Box>
      )}
    </Box>
  );
};
