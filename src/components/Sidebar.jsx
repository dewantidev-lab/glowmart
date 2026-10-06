import { Link } from "react-router-dom";

// SidebarOpen menerima props dari AdminLayout.
// sidebarOpen digunakan untuk menentukan sidebar sedang terbuka atau tertutup.
export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <div
      className={`${
        sidebarOpen ? "block" : "hidden"
      } md:block w-64 bg-white shadow-md`}
    >
      <div className="p-4 font-bold text-xl">
        GlowMart Admin
      </div>

      <nav className="flex flex-col p-4 space-y-2">
        <Link
          to="/admin/dashboard"
          className="hover:bg-gray-200 p-2 rounded"
        >
          Dashboard
        </Link>

        <Link
          to="/admin/products"
          className="hover:bg-gray-200 p-2 rounded"
        >
          Products
        </Link>

        <Link
          to="/admin/about"
          className="hover:bg-gray-200 p-2 rounded"
        >
          About
        </Link>
      </nav>
    </div>
  );
}