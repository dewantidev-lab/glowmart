import { Routes, Route } from "react-router-dom";

import AdminDashboard from "./pages/adminpages/AdminDashboard";
import AdminLayout from "./layouts/Adminlayout";
import AboutPage from "./pages/adminpages/AboutPage";
import AdminProducts from "./pages/adminpages/AdminProducts";
import ProductForm from "./pages/adminpages/ProductForm";

import MainLayout from "./layouts/Mainlayout";
import Dashboard from "./pages/frontpages/Dashboard";
import ProductDetail from "./pages/frontpages/ProductDetail";
import Cart from "./pages/frontpages/Cart";
import Checkout from "./pages/frontpages/Checkout";

import Login from "./pages/authpages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* Halaman utama */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>

      {/* Halaman Login */}
      <Route path="/login" element={<Login />} />

      {/* Halaman Admin - Memerlukan Login */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="add-product" element={<ProductForm />} />
        <Route path="edit-product/:id" element={<ProductForm />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
      </Route>
    </Routes>
  );
}