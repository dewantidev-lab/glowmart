import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua Kategori");

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* Search & Category */}
      <header className="bg-pink-50 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-5">
            <p className="text-pink-500 font-medium text-sm mb-1">
              Welcome to GlowMart ✨
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Find Your Everyday Beauty Essentials
            </h2>

            <p className="text-gray-500 mt-2">
              Temukan produk kecantikan favoritmu dengan mudah.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari produk skincare, makeup, hair care..."
              className="flex-1 px-5 py-3 bg-white border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-5 py-3 bg-white border border-pink-100 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-200"
            >
              <option>Semua Kategori</option>
              <option>Skincare</option>
              <option>Makeup</option>
              <option>Hair Care</option>
              <option>Body Care</option>
              <option>Fragrance</option>
              <option>Personal Care</option>
            </select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <Outlet
            context={{
              search,
              category,
              setCategory,
            }}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <h3 className="text-xl font-bold">
            Glow<span className="text-pink-400">Mart</span>
          </h3>

          <p className="text-gray-400 text-sm mt-2">
            Your Everyday Beauty Store
          </p>

          <p className="text-gray-500 text-xs mt-4">
            © 2026 GlowMart. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}