import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("Email dan password harus diisi");
      return;
    }

    try {
      setLoading(true);

      await login({
        email,
        password,
      });

      toast.success("Login berhasil!");
      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      const message =
        error.response?.data?.message || "Login gagal. Periksa kembali akun kamu.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-3xl">✿</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Glow<span className="text-pink-500">Mart</span>
          </h1>

          <p className="text-gray-500 text-sm mt-2">
            Admin Login
          </p>
        </div>

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email"
              className="w-full px-4 py-3 border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              className="w-full px-4 py-3 border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white font-semibold py-3 rounded-xl transition"
          >
            {loading ? "Memproses..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-sm text-pink-500 hover:text-pink-600"
          >
            ← Kembali ke halaman toko
          </Link>
        </div>

      </div>
    </div>
  );
}