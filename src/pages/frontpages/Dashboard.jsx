import { useOutletContext } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import CategoryCard from "../../components/CategoryCard";
import { products } from "../../utils/data";

export default function Dashboard() {
  const { search, category } = useOutletContext();

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category_name.toLowerCase().includes(search.toLowerCase());

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
          produk
        </p>
      </div>

      {/* Conditional Rendering */}
      {filteredProducts.length === 0 ? (
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
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((item) => (
            <ProductCard key={item.id} p={item} />
          ))}
        </div>
      )}
    </div>
  );
}