import { useState } from "react";
import { useProducts } from "../../utils/ProductContext";
import { useNavigate } from "react-router-dom";

export default function AdminProducts() {
  const {
    products,
    categories,
    isLoading,
    isError,
    error,
    deleteProduct,
    filters,
    updateFilters,
    pagination,
  } = useProducts();

  const navigate = useNavigate();

  // Menyimpan input filter sementara
  const [search, setSearch] = useState(filters.search);
  const [categoryId, setCategoryId] = useState(filters.category_id);
  const [minPrice, setMinPrice] = useState(filters.min_price);
  const [maxPrice, setMaxPrice] = useState(filters.max_price);

  // Menerapkan pencarian dan filter
  const handleFilter = (e) => {
    e.preventDefault();

    updateFilters({
      search,
      category_id: categoryId,
      min_price: minPrice,
      max_price: maxPrice,
    });
  };

  // Mengatur ulang filter
  const handleReset = () => {
    setSearch("");
    setCategoryId("");
    setMinPrice("");
    setMaxPrice("");

    updateFilters({
      search: "",
      category_id: "",
      min_price: "",
      max_price: "",
    });
  };

  // Menghapus produk
  const handleDelete = async (product) => {
    const confirmDelete = window.confirm(
      `Apakah kamu yakin ingin menghapus produk "${product.name}"?`
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct.mutateAsync(product.product_id);
    } catch (error) {
      console.error(
        "Gagal menghapus produk:",
        error.response?.data || error
      );
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Kelola Produk
          </h1>
          <p className="text-gray-500 mt-1">
            Lihat dan kelola produk yang tersedia di GlowMart.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/add-product")}
          className="px-5 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition"
        >
          + Tambah Produk
        </button>
      </div>

      <div className="bg-white border border-pink-100 rounded-2xl p-6">

        {/* Judul */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-5 gap-2">
          <h2 className="text-xl font-bold text-gray-800">
            Daftar Produk
          </h2>

          <span className="text-sm text-gray-500">
            {pagination.total} total produk
          </span>
        </div>

        {/* Form Pencarian dan Filter */}
        <form
          onSubmit={handleFilter}
          className="bg-pink-50 rounded-xl p-4 mb-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Pencarian */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cari Produk
              </label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Masukkan nama produk..."
                className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            {/* Kategori */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                <option value="">Semua Kategori</option>
                {categories.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.category}
                  </option>
                ))}
              </select>
            </div>

            {/* Harga Minimum */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Harga Minimum
              </label>
              <input
                type="number"
                min="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Contoh: 10000"
                className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            {/* Harga Maksimum */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Harga Maksimum
              </label>
              <input
                type="number"
                min="0"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Contoh: 100000"
                className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>
          </div>

          {/* Tombol Filter */}
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="px-5 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
            >
              Terapkan Filter
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2 bg-white border border-pink-300 text-pink-600 rounded-lg hover:bg-pink-100 transition"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Tabel Produk */}
        {isLoading ? (
          <p className="text-gray-500 text-center py-8">
            Memuat data produk...
          </p>
        ) : isError ? (
          <p className="text-red-500 text-center py-8">
            Gagal mengambil data: {error?.message}
          </p>
        ) : products.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Produk tidak ditemukan.
          </p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-500 text-sm">
                    <th className="py-3 px-3">No.</th>
                    <th className="py-3 px-3">Gambar</th>
                    <th className="py-3 px-3">Nama Produk</th>
                    <th className="py-3 px-3">Kategori</th>
                    <th className="py-3 px-3">Harga</th>
                    <th className="py-3 px-3">Stok</th>
                    <th className="py-3 px-3">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product, index) => (
                    <tr
                      key={product.id}
                      className="border-b border-gray-50 hover:bg-pink-50"
                    >
                      <td className="py-4 px-3">
                        {(pagination.currentPage - 1) *
                          pagination.perPage +
                          index +
                          1}
                      </td>

                      <td className="py-4 px-3">
                        {product.img ? (
                          <img
                            src={product.img}
                            alt={product.name}
                            className="w-14 h-14 object-cover rounded-lg"
                          />
                        ) : (
                          <span className="text-gray-400 text-xs">
                            Tidak ada gambar
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-3 font-medium text-gray-800">
                        {product.name}
                      </td>

                      <td className="py-4 px-3 text-gray-600">
                        {product.category_name || "-"}
                      </td>

                      <td className="py-4 px-3 text-gray-700">
                        Rp {Number(product.price).toLocaleString("id-ID")}
                      </td>

                      <td className="py-4 px-3 text-gray-700">
                        {product.stock}
                      </td>

                      <td className="py-4 px-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              navigate(
                                `/admin/edit-product/${product.product_id}`
                              )
                            }
                            className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(product)}
                            disabled={deleteProduct.isPending}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-50"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
              <p className="text-sm text-gray-500">
                Halaman {pagination.currentPage} dari {pagination.lastPage}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    updateFilters({ page: pagination.currentPage - 1 })
                  }
                  disabled={pagination.currentPage <= 1}
                  className="px-4 py-2 border border-pink-300 text-pink-600 rounded-lg hover:bg-pink-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Sebelumnya
                </button>

                <button
                  onClick={() =>
                    updateFilters({ page: pagination.currentPage + 1 })
                  }
                  disabled={
                    pagination.currentPage >= pagination.lastPage
                  }
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Selanjutnya
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}