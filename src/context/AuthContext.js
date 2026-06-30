"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

const AuthContext = createContext();

const setAuthCookie = (token) => {
  document.cookie = `auth_token=${token}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`;
};

const clearAuthCookie = () => {
  document.cookie = "auth_token=; path=/; max-age=0";
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refreshProfile = async () => {
    try {
      const { data } = await api.get("/auth/me");
      if (data.success) {
        setUser(data.data);
        localStorage.setItem("user", JSON.stringify(data.data));
      }
    } catch {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      clearAuthCookie();
      setUser(null);
    }
  };

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
        await refreshProfile();
      }
      setLoading(false);
    };
    init();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        setAuthCookie(data.token);
        setUser(data.user);
        router.push(`/dashboard/${data.user.role}`);
        return { success: true };
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Login failed" };
    }
  };

  const register = async (name, email, password, role) => {
    try {
      const { data } = await api.post("/auth/register", { name, email, password, role });
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        setAuthCookie(data.token);
        setUser(data.user);
        router.push(`/dashboard/${data.user.role}`);
        return { success: true };
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Registration failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    clearAuthCookie();
    setUser(null);
    router.push("/login");
  };

  const updateProfile = async (profileData) => {
    try {
      const { data } = await api.put("/users/me", profileData);
      if (data.success) {
        setUser(data.data);
        localStorage.setItem("user", JSON.stringify(data.data));
        return { success: true };
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Update failed" };
    }
  };

  const becomeSeller = async () => {
    try {
      const { data } = await api.post("/users/me/become-seller");
      if (data.success) {
        setUser(data.data);
        localStorage.setItem("user", JSON.stringify(data.data));
        return { success: true };
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Could not switch to seller" };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, refreshProfile, becomeSeller }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
