import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../../api/orderClient";

export const useOrderQuery = () => {
  const {
    isSuccess,
    isPending,
    isError,
    data: orders = [],
    error,
  } = useQuery({
    queryKey: ["all_orders"],
    queryFn: getAllOrders,
  });

  return {
    isSuccess,
    isPending,
    isError,
    orders,
    error,
  };
};
