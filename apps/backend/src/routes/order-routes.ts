import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth-middleware";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrder,
  updateOrderStatus,
} from "../controllers/order-controller";

const router = Router();

// Creating an order for the current user
router.post("/", createOrder);

// Getting all available orders
router.get("/all", authenticate, authorize, getAllOrders);

// Getting a specific order
router.get("/:id", authenticate, authorize, getOrder);

// Deleting a specific order
router.delete("/:id", authenticate, authorize, deleteOrder);

router.put("/:id", authenticate, authorize, updateOrderStatus);

export default router;
