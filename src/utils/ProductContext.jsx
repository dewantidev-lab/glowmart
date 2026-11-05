import { createContext, useContext, useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosClient from "../api/axiosClient";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const queryClient = useQueryClient();

  // State pagination dan filter produk
  const [filters, setFilters] = useState({
    page: 1,
    search: "",
    category_id: "",
    min_price: "",
    max_price: "",
  });

  // Mengubah filter dan kembali ke halaman pertama
  const updateFilters = (newFilters) => {
    setFilters((previous) => ({
      ...previous,
      ...newFilters,
      page: newFilters.page !== undefined ? newFilters.page : 1,
    }));
  };

  // Mengambil produk berdasarkan filter dan pagination
  const {
    data: productData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", filters],
    queryFn: async () => {
      const response = await axiosClient.get("/products", {
        params: filters,
      });

      return response.data.data;
    },
  });

  // Mengambil daftar kategori
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosClient.get("/categories");
      return response.data.data;
    },
  });

  // Mengambil produk khusus untuk dashboard
  const {
    data: dashboardData = { products: [], total: 0 },
    isLoading: dashboardIsLoading,
  } = useQuery({
    queryKey: ["dashboard-products"],
    queryFn: async () => {
      const response = await axiosClient.get("/products", {
        params: { page: 1 },
      });

      const result = response.data.data;

      return {
        total: result.total || 0,
        products: (result.data || []).map((item) => ({
          ...item,
          id: item.product_id,
          category_name: item.category?.category || "",
          img: item.img
            ? `http://127.0.0.1:8000/storage/${item.img}`
            : "",
        })),
      };
    },
  });

  // Data produk dan total khusus dashboard
  const dashboardProducts = dashboardData.products;
  const dashboardTotal = dashboardData.total;

  // Menyesuaikan format data produk untuk halaman kelola produk
  const products = (productData?.data || []).map((item) => ({
    ...item,
    id: item.product_id,
    category: item.category_id,
    category_name: item.category?.category || "",
    rating: item.rating || 0,
    img: item.img
      ? `http://127.0.0.1:8000/storage/${item.img}`
      : "",
  }));

  // Menambahkan produk
  const addProduct = useMutation({
    mutationFn: async (formData) => {
      return axiosClient.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-products"] });
      toast.success("Produk berhasil ditambahkan");
    },
    onError: (error) => {
      console.error("Error tambah produk:", error.response?.data);
      toast.error("Gagal menambahkan produk");
    },
  });

  // Mengubah produk
  const updateProduct = useMutation({
    mutationFn: async ({ id, formData }) => {
      formData.append("_method", "PUT");
      return axiosClient.post(`/products/${id}`, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-products"] });
      toast.success("Produk berhasil diperbarui");
    },
    onError: () => {
      toast.error("Gagal memperbarui produk");
    },
  });

  // Menghapus produk
  const deleteProduct = useMutation({
    mutationFn: async (id) => {
      return axiosClient.delete(`/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-products"] });
      toast.success("Produk berhasil dihapus");
    },
    onError: () => {
      toast.error("Gagal menghapus produk");
    },
  });

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        isLoading,
        isError,
        error,
        addProduct,
        updateProduct,
        deleteProduct,

        // Data khusus dashboard
        dashboardProducts,
        dashboardTotal,
        dashboardIsLoading,

        // Data pagination
        pagination: {
          currentPage: productData?.current_page || 1,
          lastPage: productData?.last_page || 1,
          total: productData?.total || 0,
          perPage: productData?.per_page || 10,
        },

        // State dan fungsi filter
        filters,
        updateFilters,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}