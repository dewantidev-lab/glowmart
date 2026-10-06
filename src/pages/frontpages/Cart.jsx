import { Link } from "react-router-dom";
import { useCart } from "../../utils/CartContext";

export default function Cart() {
  const { cart, updateQty, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🛍️</div>

        <h1 className="text-2xl font-bold text-gray-800">
          Keranjang Kamu Masih Kosong
        </h1>

        <p className="text-gray-500 mt-2">
          Yuk, pilih produk beauty favoritmu terlebih dahulu.
        </p>

        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition"
        >
          Belanja Sekarang
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Keranjang Belanja
        </h1>

        <p className="text-gray-500 mt-1">
          Periksa kembali produk yang ingin kamu beli.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-pink-100 rounded-2xl p-5"
            >
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="w-full sm:w-28 h-28 bg-pink-50 rounded-xl flex items-center justify-center p-3">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1">
                  <p className="text-xs text-pink-500 font-medium">
                    {item.category_name}
                  </p>

                  <h2 className="font-semibold text-gray-800 mt-1">
                    {item.name}
                  </h2>

                  <p className="text-lg font-bold text-gray-900 mt-2">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-500">
                        Jumlah:
                      </label>

                      <input
                        type="number"
                        value={item.qty}
                        min="1"
                        max={item.stock}
                        onChange={(e) =>
                          updateQty(
                            item.id,
                            Math.min(
                              item.stock,
                              Math.max(1, parseInt(e.target.value) || 1)
                            )
                          )
                        }
                        className="w-16 border border-gray-200 rounded-lg px-2 py-1 text-center"
                      />
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm text-red-500 hover:text-red-600"
                    >
                      Hapus
                    </button>
                  </div>

                  <p className="text-sm text-gray-500 mt-3">
                    Subtotal:{" "}
                    <span className="font-semibold text-gray-800">
                      Rp {(item.price * item.qty).toLocaleString("id-ID")}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white border border-pink-100 rounded-2xl p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-800">
            Ringkasan Pesanan
          </h2>

          <div className="flex justify-between mt-6 text-gray-600">
            <span>Total Produk</span>
            <span>
              {cart.reduce((sum, item) => sum + item.qty, 0)} item
            </span>
          </div>

          <div className="border-t border-gray-100 my-4"></div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-800">
              Total
            </span>

            <span className="text-xl font-bold text-pink-500">
              Rp {total.toLocaleString("id-ID")}
            </span>
          </div>

          <Link
            to="/checkout"
            className="block text-center mt-6 px-5 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition"
          >
            Lanjut ke Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}