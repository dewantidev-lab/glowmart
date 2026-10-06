import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../utils/CartContext";

export default function Checkout() {
  const { cart } = useCart();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("QRIS");
  const [orderCreated, setOrderCreated] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !address.trim()) {
      return;
    }

    setOrderCreated(true);
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🛍️</div>

        <h1 className="text-2xl font-bold text-gray-800">
          Belum Ada Produk
        </h1>

        <p className="text-gray-500 mt-2">
          Tambahkan produk ke keranjang sebelum melakukan checkout.
        </p>

        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition"
        >
          Kembali Belanja
        </Link>
      </div>
    );
  }

  if (orderCreated) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🎉</div>

        <h1 className="text-2xl font-bold text-gray-800">
          Pesanan Berhasil Dibuat!
        </h1>

        <p className="text-gray-500 mt-2">
          Terima kasih sudah berbelanja di GlowMart.
        </p>

        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition"
        >
          Kembali ke Home
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Checkout
        </h1>

        <p className="text-gray-500 mt-1">
          Lengkapi informasi pengiriman dan pembayaran.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 bg-white border border-pink-100 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Informasi Pengiriman
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block font-medium text-gray-700 mb-2">
                Nama Lengkap
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama lengkap"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
            </div>

            <div className="mb-5">
              <label className="block font-medium text-gray-700 mb-2">
                Alamat Pengiriman
              </label>

              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Masukkan alamat lengkap"
                rows="4"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
            </div>

            <div className="mb-6">
              <label className="block font-medium text-gray-700 mb-2">
                Metode Pembayaran
              </label>

              <select
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
              >
                <option>QRIS</option>
                <option>Transfer Bank</option>
                <option>COD</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition"
            >
              Buat Pesanan
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white border border-pink-100 rounded-2xl p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-5">
            Ringkasan Pesanan
          </h2>

          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between gap-4 text-sm"
              >
                <div>
                  <p className="font-medium text-gray-700">
                    {item.name}
                  </p>

                  <p className="text-gray-400">
                    {item.qty} × Rp{" "}
                    {item.price.toLocaleString("id-ID")}
                  </p>
                </div>

                <p className="font-semibold text-gray-800 whitespace-nowrap">
                  Rp{" "}
                  {(item.price * item.qty).toLocaleString("id-ID")}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 my-5"></div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-800">
              Total
            </span>

            <span className="text-xl font-bold text-pink-500">
              Rp {total.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}