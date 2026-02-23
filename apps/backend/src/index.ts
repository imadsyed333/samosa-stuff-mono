import express from "express";
import productRoutes from "./routes/product-routes";
import userRoutes from "./routes/user-routes";
import orderRoutes from "./routes/order-routes";
import cartRoutes from "./routes/cart-routes";
import path from "path";

require("dotenv").config();
const app = express();
const port = process.env.PORT!;
const client_url = process.env.CLIENT_URL!;
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: client_url,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/products", productRoutes);

app.use("/api/user", userRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(express.static(path.join(__dirname, "../../frontend/build")));

app.get(/^\/(?!api).*/, (_req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
