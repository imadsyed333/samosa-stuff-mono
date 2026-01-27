import React from "react";
import { Order, OrderItem } from "../../../lib/types";
import { FadeWrapper } from "../FadeWrapper";
import { List, ListItem } from "@mui/material";
import { OrderItemCard } from "./OrderItemCard";

export const OrderItemList = ({ orderItems }: { orderItems: OrderItem[] }) => {
  return (
    <FadeWrapper>
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {orderItems.map((orderItem, key) => (
          <ListItem key={key}>
            <OrderItemCard orderItem={orderItem} />
          </ListItem>
        ))}
      </List>
    </FadeWrapper>
  );
};
