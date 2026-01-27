import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import { formatOrderId, formatPrice } from "../../../lib/utils";
import { Order } from "../../../lib/types";
import { Circle, ExpandMore } from "@mui/icons-material";
import { colors } from "../../../lib/themes";
import { OrderItemList } from "./OrderItemList";
import { CustomerInfo } from "../admin/CustomerInfo";

type OrderCardProps = {
  order: Order;
  isAdmin: boolean;
};

export const OrderCard = ({ order, isAdmin }: OrderCardProps) => {
  const newDate: Date = new Date(order.createdAt.toString());

  return (
    <Accordion
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        sx={{
          pb: 0,
          mb: 0,
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">
              Order #{formatOrderId(order.id)}
            </Typography>
            <Circle
              sx={{
                color: colors.status[order.status],
                fontSize: 15,
                mx: 1,
              }}
            />
          </Box>
          <Typography variant="h6">{newDate.toDateString()}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          p: 0,
        }}
      >
        {isAdmin && <CustomerInfo order={order} />}
        <OrderItemList orderItems={order.orderItems} />
        <Divider
          variant="middle"
          sx={{
            color: colors.secondary,
            opacity: 1,
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mx: 2,
            my: 1,
          }}
        >
          <Typography variant="h5">Total:</Typography>
          <Typography variant="h5">${formatPrice(order.cost)}</Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
