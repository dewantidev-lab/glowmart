import { useProducts } from "../../utils/ProductContext";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const {
  products,
  categories,
  dashboardProducts = [],
  dashboardTotal = 0,
  dashboardIsLoading,
  isLoading,
  isError,
} = useProducts();

  const navigate = useNavigate();

  // Total seluruh produk dari database
  const totalProducts = dashboardTotal;

  // Menghitung stok menipis dari 10 produk terbaru
  const lowStock = dashboardProducts.filter(
    (product) => Number(product.stock) <= 5
  ).length;

  return (
    <div>
      {/* Header Dashboard */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Selamat datang di halaman admin GlowMart.
        </p>
      </div>

      {isError ? (
        <div className="bg-white p-6 rounded-xl border border-red-100 text-red-500">
          Gagal mengambil data produk.
        </div>
      ) : (
        <>
          {/* Statistik */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

            {/* Total Produk */}
            <div className="bg-white border border-pink-100 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">
                    Total Produk
                  </p>

                  <h2 className="text-3xl font-bold text-pink-500 mt-2">
                    {isLoading ? "..." : totalProducts}
                  </h2>
                </div>

                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-2xl">
                  🛍️
                </div>
              </div>

              <p className="text-xs text-gray-400 mt-4">
                Seluruh produk di database
              </p>
            </div>

            {/* Total Kategori */}
            <div className="bg-white border border-purple-100 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">
                    Total Kategori
                  </p>

                  <h2 className="text-3xl font-bold text-purple-500 mt-2">
                    {categories.length}
                  </h2>
                </div>

                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">
                  🗂️
                </div>
              </div>

              <p className="text-xs text-gray-400 mt-4">
                Kategori produk GlowMart
              </p>
            </div>

            {/* Stok Menipis */}
            <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">
                    Stok Menipis
                  </p>

                  <h2 className="text-3xl font-bold text-orange-500 mt-2">
                    {dashboardIsLoading ? "..." : lowStock}
                  </h2>
                </div>

                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">
                  📦
                </div>
              </div>

              <p className="text-xs text-gray-400 mt-4">
                Dari 10 produk terbaru
              </p>
            </div>
          </div>

          {/* Produk Terbaru */}
          <div className="bg-white border border-pink-100 rounded-2xl p-6 shadow-sm">

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Produk Terbaru
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Produk yang terakhir ditambahkan ke GlowMart.
                </p>
              </div>

              <button
                onClick={() => navigate("/admin/products")}
                className="text-sm font-semibold text-pink-500 hover:text-pink-700"
              >
                Lihat Semua Produk →
              </button>
            </div>

            {dashboardIsLoading ? (
              <p className="text-gray-500 text-center py-8">
                Memuat produk...
              </p>
            ) : dashboardProducts.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Belum ada produk yang ditambahkan.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {dashboardProducts.slice(0, 5).map((product) => (
                  <div
                    key={product.id}
                    className="border border-pink-100 rounded-xl overflow-hidden hover:shadow-md transition group"
                  >
                    {/* Gambar Produk */}
                    <div className="h-44 bg-pink-50 overflow-hidden flex items-center justify-center">
                      {product.img ? (
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      ) : (
                        <div className="text-center text-gray-400">
                          <span className="text-4xl">🧴</span>

                          <p className="text-xs mt-2">
                            Tidak ada gambar
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Informasi Produk */}
                    <div className="p-4">
                      <span className="inline-block text-xs bg-pink-100 text-pink-600 px-3 py-1 rounded-full mb-2">
                        {product.category_name || "Tanpa kategori"}
                      </span>

                      <h3 className="font-semibold text-gray-800 truncate">
                        {product.name}
                      </h3>

                      <p className="text-pink-500 font-bold mt-2">
                        Rp {Number(product.price).toLocaleString("id-ID")}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        Stok: {product.stock}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}