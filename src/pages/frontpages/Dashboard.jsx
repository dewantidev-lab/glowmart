import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import CategoryCard from "../../components/CategoryCard";
import { useProducts } from "../../utils/ProductContext";

export default function Dashboard() {
  const { search, category } = useOutletContext();

  const {
    products = [],
    isLoading,
    isError,
    pagination,
    updateFilters,
  } = useProducts();

  // Kembali ke halaman pertama ketika pencarian atau kategori berubah
  useEffect(() => {
    if (pagination.currentPage !== 1) {
      updateFilters({ page: 1 });
    }
  }, [search, category]);

  // Filter produk berdasarkan pencarian dan kategori
  const filteredProducts = products.filter((product) => {
    const keyword = (search || "").toLowerCase();

    const matchesSearch =
      product.name.toLowerCase().includes(keyword) ||
      product.category_name.toLowerCase().includes(keyword);

    const matchesCategory =
      category === "Semua Kategori" ||
      product.category_name === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Produk Pilihan
        </h1>

        <p className="text-gray-500 mt-1">
          Temukan produk beauty favoritmu di GlowMart.
        </p>
      </div>

      {/* Category */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Jelajahi Kategori
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <CategoryCard name="Skincare" icon="🧴" />
          <CategoryCard name="Makeup" icon="💄" />
          <CategoryCard name="Hair Care" icon="💇‍♀️" />
          <CategoryCard name="Body Care" icon="🧼" />
          <CategoryCard name="Fragrance" icon="🌸" />
          <CategoryCard name="Personal Care" icon="✨" />
        </div>
      </div>

      {/* Product Count */}
      <div className="mb-5">
        <p className="text-sm text-gray-500">
          Menampilkan{" "}
          <span className="font-semibold text-pink-500">
            {filteredProducts.length}
          </span>{" "}
          produk pada halaman ini dari{" "}
          <span className="font-semibold text-pink-500">
            {pagination.total}
          </span>{" "}
          total produk
        </p>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="text-center py-16">
          <p className="text-gray-500">
            Memuat produk GlowMart...
          </p>
        </div>
      ) : isError ? (
        <div className="text-center py-16 bg-pink-50 rounded-2xl">
          <h2 className="text-xl font-semibold text-gray-800">
            Gagal memuat produk
          </h2>
          <p className="text-gray-500 mt-2">
            Periksa koneksi ke server Laravel.
          </p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-pink-50 rounded-2xl">
          <div className="text-5xl mb-4">🔍</div>

          <h2 className="text-xl font-semibold text-gray-800">
            Produk tidak ditemukan
          </h2>

          <p className="text-gray-500 mt-2">
            Coba gunakan kata pencarian atau kategori yang berbeda.
          </p>
        </div>
      ) : (
        <>
          {/* Product List */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((item) => (
              <ProductCard key={item.id} p={item} />
            ))}
          </div>

          {/* Pagination */}
          {pagination.lastPage > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 mb-6">
              <button
                type="button"
                onClick={() =>
                  updateFilters({
                    page: pagination.currentPage - 1,
                  })
                }
                disabled={pagination.currentPage <= 1}
                className="px-5 py-2 rounded-lg border border-pink-200 text-pink-500 font-medium hover:bg-pink-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ← Sebelumnya
              </button>

              <span className="text-sm text-gray-600">
                Halaman{" "}
                <span className="font-semibold text-pink-500">
                  {pagination.currentPage}
                </span>{" "}
                dari {pagination.lastPage}
              </span>

              <button
                type="button"
                onClick={() =>
                  updateFilters({
                    page: pagination.currentPage + 1,
                  })
                }
                disabled={
                  pagination.currentPage >= pagination.lastPage
                }
                className="px-5 py-2 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Berikutnya →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}