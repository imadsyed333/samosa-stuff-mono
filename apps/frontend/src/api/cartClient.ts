import { CartItem, DeleteItem, UpdateItem } from "../lib/types";
import api from "./api";

type CartItemsResponse = {
  cartItems: CartItem[];
};

type CheckoutUrlResponse = {
  url: string;
};

export const getAllCartItems = async () => {
  try {
    const res = await api.get<CartItemsResponse>("/cart");
    return res.data.cartItems;
  } catch (e) {
    console.error("Error fetching cart:", e);
    throw e;
  }
};

export const addCartItem = async (productId: number, quantity: number) => {
  try {
    const res = await api.post("/cart/add", { productId, quantity });
    return res.data;
  } catch (e) {
    console.error("Error adding to cart:", e);
    throw e;
  }
};

export const syncCart = async (
  updateItems: UpdateItem[],
  deleteItems: DeleteItem[]
) => {
  try {
    const res = await api.put("/cart/sync", { updateItems, deleteItems });
    return res.data;
  } catch (e) {
    console.error("Error syncing cart:", e);
    throw e;
  }
};

export const checkoutCart = async () => {
  try {
    const res = await api.post<CheckoutUrlResponse>(
      "payments/create-checkout-session"
    );
    return res.data;
  } catch (e) {
    console.error("Error creating payment session:", e);
    throw e;
  }
};
