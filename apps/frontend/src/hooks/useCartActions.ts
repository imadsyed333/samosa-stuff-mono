import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addCartItem, getAllCartItems, syncCart } from "../api/cartClient";
import { CartItem, DeleteItem, Product, UpdateItem } from "../lib/types";
import { useRef } from "react";

var debounce = require("lodash/debounce");

export const useCartActions = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: ({
      product,
      quantity,
    }: {
      product: Product;
      quantity: number;
    }) => addCartItem(product.id, quantity),

    onMutate: async ({ product, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCart = queryClient.getQueryData<CartItem[]>(["cart"]) || [];

      let optimisticCart: CartItem[];
      const existingIndex = previousCart.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingIndex > -1) {
        optimisticCart = previousCart.map((item, i) =>
          i === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        optimisticCart = [
          ...previousCart,
          { id: product.id, product, quantity },
        ];
      }

      queryClient.setQueryData(["cart"], optimisticCart);

      return { previousCart };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const syncMutation = useMutation({
    mutationFn: ({
      updateItems,
      deleteItems,
    }: {
      updateItems: UpdateItem[];
      deleteItems: DeleteItem[];
    }) => {
      return syncCart(updateItems, deleteItems);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const debouncedSync = useRef(
    debounce(
      (payload: { updateItems: UpdateItem[]; deleteItems: DeleteItem[] }) => {
        syncMutation.mutate(payload);
      },
      800
    )
  ).current;

  const addToCart = (product: Product, quantity = 1) => {
    addMutation.mutate({ product, quantity });
  };

  const updateQuantity = (cartItemId: number, quantity: number) => {
    queryClient.setQueryData<CartItem[]>(["cart"], (old: CartItem[] = []) =>
      old.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
    debouncedSync({
      updateItems: [{ id: cartItemId, quantity }],
      deleteItems: [],
    });
  };

  const deleteItem = (cartItemId: number) => {
    queryClient.setQueryData(["cart"], (old: CartItem[] = []) =>
      old.filter((item) => item.id !== cartItemId)
    );
    debouncedSync({ updateItems: [], deleteItems: [{ id: cartItemId }] });
  };

  return {
    addToCart,
    updateQuantity,
    deleteItem,
  };
};
