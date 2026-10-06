import { useState } from "react";
import { products } from "../../utils/data";

export default function AdminProducts() {
  const [productList, setProductList] = useState(products);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("Skincare");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !price || !stock) {
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      price: Number(price),
      stock: Number(stock),
      category_name: category,
      rating: 0,
      img: "",
    };

    setProductList([...productList, newProduct]);

    setName("");
    setPrice("");
    setStock("");
    setCategory("Skincare");
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Kelola Produk
        </h1>

        <p className="text-gray-500 mt-1">
          Tambahkan produk baru ke dalam katalog GlowMart.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Input */}
        <div className="lg:col-span-1 bg-white border border-pink-100 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-5">
            Tambah Produk
          </h2>

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
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium text-gray-700 mb-2">
                Harga
              </label>

              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Contoh: 85000"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium text-gray-700 mb-2">
                Stok
              </label>

              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Contoh: 10"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
            </div>

            <div className="mb-5">
              <label className="block font-medium text-gray-700 mb-2">
                Kategori
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3"
              >
                <option>Skincare</option>
                <option>Makeup</option>
                <option>Hair Care</option>
                <option>Body Care</option>
                <option>Fragrance</option>
                <option>Personal Care</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full px-5 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition"
            >
              + Tambah Produk
            </button>
          </form>
        </div>

        {/* Product List */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-pink-100 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-5">
              Daftar Produk
            </h2>

            <div className="space-y-3">
              {productList.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between border border-gray-100 rounded-xl p-4"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {product.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {product.category_name} • Stok: {product.stock}
                    </p>
                  </div>

                  <p className="font-semibold text-gray-800">
                    Rp {product.price.toLocaleString("id-ID")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}