import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

const useAuthStore = create((set) => ({
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const { data } = await axiosInstance.get("/auth/check-auth");
      set({
        isAuthenticated: true,
        isCheckingAuth: false,
        user: data.user,
      });
    } catch {
      set({
        isAuthenticated: false,
        isCheckingAuth: false,
        user: null,
      });
    }
  },
  error: null,

  forgotPassword: async (email) => {
    set({ error: null, isLoading: true });
    try {
      const { data } = await axiosInstance.post("/auth/forgot-password", {
        email,
      });
      set({ isLoading: false });
      toast.success(data.message);
      return data;
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        "Gửi yêu cầu thất bại. Vui lòng thử lại.";
      set({ error: msg, isLoading: false });
      toast.error(msg);
      throw error;
    }
  },
  isAuthenticated: false,
  isCheckingAuth: true,
  isLoading: false,

  login: async ({ email, password }) => {
    set({ error: null, isLoading: true });
    try {
      const { data } = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      set({
        isAuthenticated: true,
        isLoading: false,
        user: data.user,
      });
      toast.success(data.message);
      return data;
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        "Đăng nhập thất bại. Vui lòng thử lại.";
      set({ error: msg, isLoading: false });
      toast.error(msg);
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await axiosInstance.post("/auth/logout");
      set({
        error: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });
      toast.success("Đăng xuất thành công");
    } catch {
      set({ isLoading: false });
      toast.error("Đăng xuất thất bại");
    }
  },

  resetPassword: async (token, password) => {
    set({ error: null, isLoading: true });
    try {
      const { data } = await axiosInstance.post(
        `/auth/reset-password/${token}`,
        { password },
      );
      set({ isLoading: false });
      toast.success(data.message);
      return data;
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        "Đặt lại mật khẩu thất bại. Vui lòng thử lại.";
      set({ error: msg, isLoading: false });
      toast.error(msg);
      throw error;
    }
  },

  signup: async ({ name, email, password }) => {
    set({ error: null, isLoading: true });
    try {
      const { data } = await axiosInstance.post("/auth/signup", {
        email,
        name,
        password,
      });
      set({
        isAuthenticated: true,
        isLoading: false,
        user: data.user,
      });
      toast.success(data.message);
      return data;
    } catch (error) {
      const msg =
        error.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.";
      set({ error: msg, isLoading: false });
      toast.error(msg);
      throw error;
    }
  },
  user: null,

  verifyEmail: async (code) => {
    set({ error: null, isLoading: true });
    try {
      const { data } = await axiosInstance.post("/auth/verify-email", {
        code,
      });
      set({
        isAuthenticated: true,
        isLoading: false,
        user: data.user,
      });
      toast.success(data.message);
      return data;
    } catch (error) {
      const msg =
        error.response?.data?.message || "Xác thực thất bại. Vui lòng thử lại.";
      set({ error: msg, isLoading: false });
      toast.error(msg);
      throw error;
    }
  },
}));

export default useAuthStore;
