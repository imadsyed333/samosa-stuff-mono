import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Order, OrderStatus } from "../../../lib/types";
import { colors } from "../../../lib/themes";
import { useOrderActions } from "./useOrderActions";
import { useOrderQuery } from "./useOrderQuery";
import { Circle } from "@mui/icons-material";

type CustomerInfoProps = {
  order: Order;
};

export const CustomerInfo = ({ order }: CustomerInfoProps) => {
  const { id, user, status } = order;

  const [orderStatus, setOrderStatus] = useState(status);

  const { updateStatus } = useOrderActions();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        mx: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          justifyContent: "start",
          mb: 1,
        }}
      >
        <Typography variant="h6">
          <b>Name:</b> {user?.name}
        </Typography>
        <Typography variant="h6">
          <b>Email: </b> {user?.email}
        </Typography>
        <Typography variant="h6">
          <b>Phone: </b> {order.phone}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
        }}
      >
        <Select
          defaultValue={status}
          value={orderStatus}
          onChange={(e) => setOrderStatus(e.target.value)}
          sx={{
            flex: 1,
          }}
        >
          {Object.values(OrderStatus).map((value, key) => (
            <MenuItem
              key={key}
              value={value}
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Circle
                  sx={{
                    fontSize: 15,
                    color: colors.status[value],
                    mr: 1,
                  }}
                />
                <Typography>{value}</Typography>
              </Box>
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.button.primary,
            flex: 1,
            ml: 1,
          }}
          onClick={() => updateStatus(id, orderStatus)}
        >
          Update Status
        </Button>
      </Box>
    </Box>
  );
};
