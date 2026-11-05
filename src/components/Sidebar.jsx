import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import toast from "react-hot-toast";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Berhasil logout!");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error("Terjadi kesalahan saat logout.");
    }
  };

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

        <button
          onClick={handleLogout}
          className="text-left hover:bg-red-100 hover:text-red-600 p-2 rounded mt-4"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}