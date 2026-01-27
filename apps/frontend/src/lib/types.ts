export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

export type CartItem = {
  id: number;
  product: Product;
  quantity: number;
};

export enum OrderStatus {
  PLACED = "PLACED",
  READY = "READY",
  RECEIVED = "RECEIVED",
}

export type Order = {
  id: number;
  user: User;
  cost: number;
  createdAt: Date;
  orderItems: OrderItem[];
  status: OrderStatus;
  phone: string;
};

export type OrderItem = {
  product: Product;
  unitPrice: number;
  quantity: number;
  subtotal: number;
};

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
};

export type FieldErrors = {
  name?: String[];
  email?: String[];
  password?: String[];
  error?: String;
};

export type UpdateItem = {
  id: number;
  quantity: number;
};

export type DeleteItem = {
  id: number;
};

export type ProductUploadType = {
  name: string;
  description: string;
  price: number;
  image: File | null;
};
