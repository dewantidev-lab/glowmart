import { Link } from "react-router-dom";
import { useCart } from "../utils/CartContext";

export default function ProductCard({ p }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white border border-pink-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300">
      {/* Product Image */}
      <div className="bg-pink-50 h-56 flex items-center justify-center p-5">
        {p.img ? (
          <img
            src={p.img}
            alt={p.name}
            className="w-full h-full object-contain hover:scale-105 transition duration-300"
          />
        ) : (
          <div className="text-gray-400 text-sm">
            Image unavailable
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="p-5">
        <p className="text-xs text-pink-500 font-medium mb-2">
          {p.category_name}
        </p>

        <h2 className="font-semibold text-gray-800 leading-snug min-h-[48px]">
          {p.name}
        </h2>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-3">
          <span className="text-yellow-400">★</span>
          <span className="text-sm text-gray-500">
            {p.rating}.0
          </span>
        </div>

        {/* Price */}
        <p className="text-lg font-bold text-gray-900 mt-3">
          Rp {p.price.toLocaleString("id-ID")}
        </p>

        {/* Stock */}
        <p className="text-xs text-gray-400 mt-1">
          Stok tersedia: {p.stock}
        </p>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <Link
            to={`/product/${p.slug}`}
            className="flex-1 text-center px-3 py-2 border border-pink-200 text-pink-500 rounded-xl hover:bg-pink-50 transition"
          >
            Detail
          </Link>

          <button
            onClick={() => addToCart(p)}
            className="flex-1 px-3 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition"
          >
            + Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}