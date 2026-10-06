import { Routes, Route } from "react-router-dom";

import AdminDashboard from "./pages/adminpages/AdminDashboard";
import AdminLayout from "./layouts/Adminlayout";
import AboutPage from "./pages/adminpages/AboutPage";
import AdminProducts from "./pages/adminpages/AdminProducts";

import MainLayout from "./layouts/Mainlayout";
import Dashboard from "./pages/frontpages/Dashboard";
import ProductDetail from "./pages/frontpages/ProductDetail";
import Cart from "./pages/frontpages/Cart";
import Checkout from "./pages/frontpages/Checkout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}