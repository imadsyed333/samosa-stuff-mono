import { Order, OrderStatus } from "../lib/types";
import api from "./api";

type GetOrdersResponse = {
  orders: Order[];
};

type UpdateOrderResponse = {
  order: Order;
};

export const getUserOrders = async () => {
  try {
    const res = await api.get<GetOrdersResponse>("/orders");
    return res.data.orders;
  } catch (e) {
    console.error("Error fetching orders:", e);
    throw e;
  }
};

export const getAllOrders = async () => {
  try {
    const res = await api.get<GetOrdersResponse>("/orders/all");
    return res.data.orders;
  } catch (e) {
    console.error("Error fetching orders:", e);
    throw e;
  }
};

export const createOrder = async (phone: string) => {
  try {
    const res = await api.post(`/orders`, { phone });
    return res.data;
  } catch (e) {
    console.error("Error creating order:", e);
    throw e;
  }
};

export const updateOrderStatus = async (id: number, status: OrderStatus) => {
  try {
    const res = await api.put<UpdateOrderResponse>(`/orders/${id}`, { status });
    return res.data;
  } catch (e) {
    console.error("Error updating order status:", e);
    throw e;
  }
};
