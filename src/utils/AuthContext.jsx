import { createContext, useContext, useState } from "react";
import axiosClient from "../api/axiosClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() =>
    localStorage.getItem("glowmart_token")
  );

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("glowmart_user");

    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // Proses login
  const login = async (credentials) => {
    const response = await axiosClient.post("/login", credentials);

    const userData = response.data.data.user;
    const accessToken = response.data.data.token;

    localStorage.setItem("glowmart_token", accessToken);
    localStorage.setItem("glowmart_user", JSON.stringify(userData));

    setToken(accessToken);
    setUser(userData);

    return response.data;
  };

  // Proses logout
  const logout = async () => {
    try {
      if (token) {
        await axiosClient.post("/logout");
      }
    } finally {
      localStorage.removeItem("glowmart_token");
      localStorage.removeItem("glowmart_user");

      setToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isAuthenticated: Boolean(token),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}