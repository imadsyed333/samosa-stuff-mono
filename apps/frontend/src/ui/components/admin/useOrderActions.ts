import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Order, OrderStatus } from "../../../lib/types";
import { updateOrderStatus } from "../../../api/orderClient";

export const useOrderActions = () => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: OrderStatus }) => {
      try {
        const res = await updateOrderStatus(id, status);
        return res.order;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    onSuccess: (updatedOrder) => {
      queryClient.setQueryData<Order[]>(["all_orders"], (oldOrders) =>
        updateOrders(oldOrders, updatedOrder)
      );
    },
  });

  const updateOrders = (
    oldOrders: Order[] | undefined,
    updatedOrder: Order
  ) => {
    return (
      oldOrders?.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      ) || []
    );
  };

  const updateStatus = (id: number, status: OrderStatus) => {
    updateMutation.mutate({ id, status });
  };

  return {
    updateStatus,
  };
};
