import React from "react";
import { Route, Routes } from "react-router";
import { Home } from "../pages/HomePage";
import { Menu } from "../pages/MenuPage";
import { ProductPage } from "../pages/ProductPage";
import { Cart } from "../pages/CartPage";
import { Login } from "../pages/LoginPage";
import { Register } from "../pages/RegisterPage";
import { Profile } from "../pages/ProfilePage";
import { CheckoutSuccessPage } from "../pages/CheckoutSuccessPage";
import { AdminPage } from "../pages/AdminPage";
import CheckoutPage from "../pages/CheckoutPage";

export const PageContent = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="menu" element={<Menu />} />
      <Route path="menu/:id" element={<ProductPage />} />
      <Route path="cart" element={<Cart />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="profile" element={<Profile />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
};
