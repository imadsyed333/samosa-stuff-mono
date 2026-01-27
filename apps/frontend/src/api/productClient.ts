import { Product, ProductUploadType } from "../lib/types";
import api from "./api";

type SingleProductResponse = {
  product: Product;
};

type ManyProductResponse = {
  products: Product[];
};

export const createProduct = async (product: ProductUploadType) => {
  try {
    const formData = new FormData();
    const { name, price, description, image } = product;
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", String(price));
    if (image) formData.append("image", image);

    const res = await api.post<SingleProductResponse>("/products", formData);
    return res.data.product;
  } catch (e) {
    console.error("Error creating product", e);
    throw e;
  }
};

export const getProductWithId = async (id: number) => {
  try {
    const res = await api.get<SingleProductResponse>(`/products/${id}`);
    return res.data;
  } catch (e) {
    console.error("Error fetching product:", e);
    throw e;
  }
};

export const getAllProducts = async () => {
  try {
    const res = await api.get<ManyProductResponse>("/products/all");
    return res.data.products;
  } catch (e) {
    console.error("Error fetching products:", e);
    throw e;
  }
};

export const updateProduct = async (id: number, product: ProductUploadType) => {
  try {
    const formData = new FormData();
    const { name, price, description, image } = product;

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", String(price));
    if (image) formData.append("image", image);
    const res = await api.put<SingleProductResponse>(
      `/products/${id}}`,
      formData
    );
    return res.data.product;
  } catch (e) {
    console.error("Error updating product:", e);
    throw e;
  }
};
