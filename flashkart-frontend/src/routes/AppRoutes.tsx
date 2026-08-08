import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

import ProductList from "../pages/products/ProductList";
import Cart from "../pages/cart/Cart";
import OrderHistory from "../pages/orders/OrderHistory";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Checkout from "../pages/checkout/Checkout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/checkout" element={<Checkout />} />
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<OrderHistory />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
