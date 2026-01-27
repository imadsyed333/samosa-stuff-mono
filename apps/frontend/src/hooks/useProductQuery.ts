import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../api/productClient";

export const useProductQuery = () => {
  const {
    isSuccess,
    isPending,
    isError,
    data: products = [],
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  return {
    isSuccess,
    isPending,
    isError,
    products,
    error,
  };
};
