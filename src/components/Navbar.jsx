import { Link } from "react-router-dom";
import { useCart } from "../utils/CartContext";

export default function Navbar() {
  const { totalQty } = useCart();

  return (
    <nav className="bg-white border-b border-pink-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
            <span className="text-xl">✿</span>
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Glow<span className="text-pink-500">Mart</span>
            </h1>
            <p className="text-xs text-gray-400">
              Your Everyday Beauty Store
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link
            to="/"
            className="text-gray-700 hover:text-pink-500 transition"
          >
            Home
          </Link>

          <Link
            to="/cart"
            className="text-gray-700 hover:text-pink-500 transition flex items-center gap-2"
          >
            Keranjang
            <span className="bg-pink-500 text-white px-2 py-0.5 rounded-full text-xs">
              {totalQty}
            </span>
          </Link>

          <Link
            to="/checkout"
            className="text-gray-700 hover:text-pink-500 transition"
          >
            Checkout
          </Link>
        </div>
      </div>
    </nav>
  );
}