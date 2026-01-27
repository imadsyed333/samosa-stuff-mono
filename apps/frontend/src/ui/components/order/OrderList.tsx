import React from "react";
import { FadeWrapper } from "../FadeWrapper";
import { CircularProgress, List, ListItem, Typography } from "@mui/material";
import { Order } from "../../../lib/types";
import { OrderCard } from "./OrderCard";

type OrderListProps = {
  orders: Order[];
  isAdmin?: boolean;
};

export const OrderList = ({ orders, isAdmin = false }: OrderListProps) => {
  return (
    <FadeWrapper>
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          overflowY: "scroll",
        }}
      >
        {orders.map((order, key) => (
          <ListItem key={key}>
            <OrderCard order={order} isAdmin={isAdmin} />
          </ListItem>
        ))}
      </List>
    </FadeWrapper>
  );
};
