import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, ProductUploadType } from "../lib/types";
import { createProduct, updateProduct } from "../api/productClient";

export const useProductActions = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: async (product: ProductUploadType) => {
      try {
        const newProduct = await createProduct(product);
        return newProduct;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    onSuccess: (newProduct) => {
      queryClient.setQueryData<Product[]>(["products"], (oldProducts) => {
        return oldProducts ? [...oldProducts, newProduct] : [newProduct];
      });
    },
  });

  const editMutation = useMutation({
    mutationFn: async ({
      id,
      product,
    }: {
      id: number;
      product: ProductUploadType;
    }) => {
      try {
        const updatedProduct = await updateProduct(id, product);
        return updatedProduct;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    onSuccess: (updatedProduct) => {
      queryClient.setQueryData<Product[]>(["products"], (oldProducts) =>
        updateProducts(oldProducts, updatedProduct)
      );
    },
  });

  const updateProducts = (
    oldProducts: Product[] | undefined,
    updatedProduct: Product
  ) => {
    return (
      oldProducts?.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      ) || []
    );
  };

  const editProduct = (id: number, product: ProductUploadType) => {
    console.log(product);
    editMutation.mutate({ id, product });
  };

  const addProduct = (product: ProductUploadType) => {
    addMutation.mutate(product);
  };

  return {
    editProduct,
    addProduct,
  };
};
