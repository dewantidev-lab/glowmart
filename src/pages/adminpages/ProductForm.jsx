import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../../utils/ProductContext";

export default function ProductForm() {
  const {
    products,
    categories,
    isLoading,
    addProduct,
    updateProduct,
  } = useProducts();

  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const selectedProduct = products.find(
    (item) => String(item.product_id) === String(id)
  );

  useEffect(() => {
    if (isEdit && selectedProduct) {
      setName(selectedProduct.name || "");
      setCategoryId(String(selectedProduct.category_id || ""));
      setPrice(selectedProduct.price || "");
      setStock(selectedProduct.stock || "");
      setDescription(selectedProduct.description || "");
    }
  }, [isEdit, selectedProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category_id", categoryId);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("description", description);

    if (image) {
      formData.append("img", image);
    }

    try {
      if (isEdit) {
        await updateProduct.mutateAsync({
          id,
          formData,
        });
      } else {
        await addProduct.mutateAsync(formData);
      }

      navigate("/admin/products");
    } catch (error) {
      console.error(
        "Gagal menyimpan produk:",
        error.response?.data || error
      );
    }
  };

  const isPending = isEdit
    ? updateProduct.isPending
    : addProduct.isPending;

  if (isEdit && isLoading) {
    return <p className="text-gray-500">Memuat data produk...</p>;
  }

  if (isEdit && !selectedProduct) {
    return (
      <div className="bg-white p-6 rounded-2xl">
        <p className="text-red-500 mb-4">
          Produk tidak ditemukan pada daftar produk yang tersedia.
        </p>
        <button
          onClick={() => navigate("/admin/products")}
          className="px-5 py-3 bg-pink-500 text-white rounded-xl"
        >
          Kembali ke Products
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {isEdit ? "Edit Produk" : "Tambah Produk"}
        </h1>

        <p className="text-gray-500 mt-1">
          {isEdit
            ? "Perbarui informasi produk GlowMart."
            : "Masukkan informasi produk baru ke dalam katalog GlowMart."}
        </p>
      </div>

      <div className="bg-white border border-pink-100 rounded-2xl p-6 max-w-3xl">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-2">
              Nama Produk
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Facial Wash"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-2">
              Kategori
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
            >
              <option value="">Pilih Kategori</option>
              {categories.map((item) => (
                <option
                  key={item.category_id}
                  value={item.category_id}
                >
                  {item.category}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-2">
              Harga
            </label>
            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Contoh: 85000"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-2">
              Stok
            </label>
            <input
              type="number"
              min="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Contoh: 10"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-2">
              Deskripsi Produk
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Masukkan deskripsi produk..."
              rows="4"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
          </div>

          <div className="mb-6">
            <label className="block font-medium text-gray-700 mb-2">
              Gambar Produk
            </label>

            {isEdit && selectedProduct?.img && (
              <div className="mb-3">
                <p className="text-sm text-gray-500 mb-2">
                  Gambar saat ini:
                </p>
                <img
                  src={selectedProduct.img}
                  alt={selectedProduct.name}
                  className="w-28 h-28 object-cover rounded-xl"
                />
              </div>
            )}

            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={(e) => setImage(e.target.files[0] || null)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3"
            />

            <p className="text-xs text-gray-500 mt-2">
              Format JPG, JPEG, atau PNG. Maksimal ukuran 2 MB.
              Kosongkan jika tidak ingin mengganti gambar.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="px-5 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={isPending || categories.length === 0}
              className="px-5 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending
                ? "Menyimpan..."
                : isEdit
                  ? "Simpan Perubahan"
                  : "+ Simpan Produk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}