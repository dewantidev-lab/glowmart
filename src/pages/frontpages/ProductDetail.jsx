import { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../../utils/data";
import { useCart } from "../../utils/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const p = products.find((item) => item.slug === id);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rating || !review.trim()) return;

    const newReview = {
      id: Date.now(),
      rating,
      review,
    };

    setReviews([...reviews, newReview]);
    setRating(0);
    setReview("");
  };

  if (!p) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-gray-800">
          Produk tidak ditemukan
        </h1>

        <p className="text-gray-500 mt-2">
          Produk yang kamu cari tidak tersedia.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Product Detail */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-pink-50 rounded-2xl p-8 flex items-center justify-center min-h-100">
          {p.img ? (
            <img
              src={p.img}
              alt={p.name}
              className="max-w-full max-h-87.5 object-contain"
            />
          ) : (
            <p className="text-gray-400">
              Image unavailable
            </p>
          )}
        </div>

        {/* Product Information */}
        <div className="bg-white border border-pink-100 rounded-2xl p-8">
          <p className="text-pink-500 font-medium mb-2">
            {p.category_name}
          </p>

          <h1 className="text-3xl font-bold text-gray-800">
            {p.name}
          </h1>

          <div className="flex items-center gap-2 mt-4">
            <span className="text-yellow-400 text-xl">
              ★
            </span>

            <span className="text-gray-600">
              {p.rating}.0
            </span>
          </div>

          <p className="text-3xl font-bold text-gray-900 mt-6">
            Rp {p.price.toLocaleString("id-ID")}
          </p>

          <p className="text-gray-500 mt-2">
            Stok tersedia: {p.stock}
          </p>

          <button
            onClick={() => addToCart(p)}
            className="w-full mt-6 px-6 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition"
          >
            + Tambahkan ke Keranjang
          </button>
        </div>
      </section>

      {/* Reviews */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Existing Reviews */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            User Reviews
          </h2>

          {reviews.length === 0 ? (
            <p className="text-gray-500">
              Belum ada review.
            </p>
          ) : (
            <div className="space-y-4">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="border border-pink-100 rounded-xl p-4"
                >
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={
                          star <= r.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-700">
                    {r.review}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Review Form */}
        <div className="border border-pink-100 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-5">
            Tulis Review
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block font-medium text-gray-700 mb-2">
                Rating
              </label>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-3xl ${
                      star <= rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label className="block font-medium text-gray-700 mb-2">
                Review
              </label>

              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
                rows="4"
                placeholder="Tulis pengalaman kamu menggunakan produk ini..."
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition"
            >
              Submit Review
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}