import { motion } from "framer-motion";
import { Calendar, Clock, LogOut, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatDateTime = (dateStr) => {
  return new Date(dateStr).toLocaleString("vi-VN", {
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const DashboardPage = () => {
  const { user, logout, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/70 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20">
              <User className="text-emerald-400" size={36} />
            </div>
            <h1 className="font-bold text-2xl text-zinc-100">
              Xin chào, {user.name}
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Chào mừng bạn đến với hệ thống
            </p>
          </div>

          <div className="mb-8 space-y-3">
            <div className="flex items-center gap-3 rounded-lg bg-zinc-800/40 px-4 py-3">
              <Mail className="shrink-0 text-zinc-500" size={18} />
              <div>
                <p className="text-xs text-zinc-500">Email</p>
                <p className="text-sm text-zinc-200">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-zinc-800/40 px-4 py-3">
              <Calendar className="shrink-0 text-zinc-500" size={18} />
              <div>
                <p className="text-xs text-zinc-500">Tham gia</p>
                <p className="text-sm text-zinc-200">
                  {formatDate(user.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-zinc-800/40 px-4 py-3">
              <Clock className="shrink-0 text-zinc-500" size={18} />
              <div>
                <p className="text-xs text-zinc-500">Đăng nhập gần nhất</p>
                <p className="text-sm text-zinc-200">
                  {formatDateTime(user.lastLogin)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-zinc-800/40 px-4 py-3">
              <div
                className={`h-2.5 w-2.5 rounded-full ${
                  user.isVerified ? "bg-emerald-400" : "bg-yellow-500"
                }`}
              />
              <div>
                <p className="text-xs text-zinc-500">Trạng thái</p>
                <p className="text-sm text-zinc-200">
                  {user.isVerified ? "Đã xác thực" : "Chưa xác thực"}
                </p>
              </div>
            </div>
          </div>

          <motion.button
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-600/80 py-2.5 font-semibold text-white transition-colors duration-200 hover:bg-red-600 disabled:opacity-50"
            disabled={isLoading}
            onClick={handleLogout}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut size={18} />
            {isLoading ? "Đang xử lý..." : "Đăng xuất"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
