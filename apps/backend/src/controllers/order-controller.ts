import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth-middleware";
import prisma from "../lib/prisma";
import z from "zod";
import { OrderStatus } from "../../generated/prisma";
import validator from "validator";
import { getParams } from "../utils/validators";

const OrderStatusSchema = z.object({
  status: z.literal(Object.values(OrderStatus)),
});

const CartSchema = z.object({
  productId: z.number({ error: "productId is required" }),
  quantity: z
    .number({ error: "quantity is required" })
    .min(1, { message: "quantity must be at least 1" }),
});

const CreateOrderSchema = z.object({
  phone: z
    .string()
    .min(1, { error: "phone must not be empty" })
    .refine((val) => validator.isMobilePhone(val), {
      error: "Invalid phone number",
    }),
  cart: z.array(CartSchema).min(1, { error: "cart cannot be empty" }),
});

export const createOrder = async (req: Request, res: Response) => {
  try {
    const parse = CreateOrderSchema.safeParse(req.body);
    if (!parse.success) {
      const errors = z.flattenError(parse.error);
      return res.status(400).json(errors.fieldErrors);
    }

    const { phone, cart } = parse.data;

    const cartProducts = await prisma.product.findMany({
      where: {
        id: {
          in: cart.map((item) => item.productId),
        },
      },
      select: { id: true, price: true },
    });

    const cartItems = cart.map((item) => {
      const product = cartProducts.find((p) => p.id === item.productId);
      if (!product) {
        throw new Error(`Product with id ${item.productId} not found`);
      }
      return {
        productId: item.productId,
        quantity: item.quantity,
      };
    });

    const orderItems = cartItems.map((item) => {
      const product = cartProducts.find((p) => p.id === item.productId)!;
      return {
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: product.price,
        subtotal: product.price * item.quantity,
      };
    });

    const amount = orderItems.reduce((acc, item) => acc + item.subtotal, 0);

    const newOrder = await prisma.order.create({
      data: {
        cost: amount,
        orderItems: {
          create: orderItems,
        },
        phone,
      },
    });

    res.status(201).json({ message: `Order #${newOrder.id} placed` });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllOrders = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const orders = await prisma.order.findMany({
      select: {
        id: true,
        cost: true,
        createdAt: true,
        status: true,
        phone: true,
        orderItems: {
          select: {
            product: true,
            unitPrice: true,
            subtotal: true,
            quantity: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json({ orders: orders });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getOrder = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const orderId = getParams(req.params.id || "");
    if (!orderId) return res.status(400).json({ error: "id not provided" });
    const order = await prisma.order.findUnique({
      where: {
        id: parseInt(orderId),
      },
    });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(200).json(order);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteOrder = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const orderId = getParams(req.params.id || "");
    if (!orderId) return res.status(400).json({ error: "id not provided" });
    const order = await prisma.order.delete({
      where: {
        id: parseInt(orderId),
      },
    });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(200).json(order);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const orderId = getParams(req.params.id || "");
    if (!orderId) return res.status(400).json({ error: "id not provided" });
    const parse = OrderStatusSchema.safeParse(req.body);
    if (!parse.success) {
      const errors = z.flattenError(parse.error);
      return res.status(400).json(errors.fieldErrors);
    }
    const newOrder = await prisma.order.update({
      where: {
        id: parseInt(orderId),
      },
      data: {
        status: parse.data.status,
      },
      select: {
        id: true,
        cost: true,
        createdAt: true,
        status: true,
        orderItems: {
          select: {
            product: true,
            unitPrice: true,
            subtotal: true,
            quantity: true,
          },
        },
      },
    });
    res.status(200).json({ order: newOrder });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
};
