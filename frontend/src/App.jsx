import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";
import LoadingSpinner from "./components/LoadingSpinner";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectAuthenticatedUser from "./components/RedirectAuthenticatedUser";
import DashboardPage from "./pages/DashboardPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SignupPage from "./pages/SignupPage";
import useAuthStore from "./store/authStore";

function App() {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  return (
    <div className="relative min-h-screen overflow-x-clip bg-zinc-950 text-zinc-100">
      <FloatingShape
        color="oklch(0.723 0.219 149.579)"
        delay={0}
        left="-10%"
        size="400px"
        top="-10%"
      />
      <FloatingShape
        color="oklch(0.696 0.17 162.48)"
        delay={4}
        left="80%"
        size="300px"
        top="60%"
      />
      <FloatingShape
        color="oklch(0.527 0.154 150.069)"
        delay={8}
        left="70%"
        size="250px"
        top="20%"
      />

      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
          path="/"
        />
        <Route
          element={
            <RedirectAuthenticatedUser>
              <SignupPage />
            </RedirectAuthenticatedUser>
          }
          path="/signup"
        />
        <Route
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
          path="/login"
        />
        <Route
          element={
            <RedirectAuthenticatedUser>
              <EmailVerificationPage />
            </RedirectAuthenticatedUser>
          }
          path="/verify-email"
        />
        <Route element={<ForgotPasswordPage />} path="/forgot-password" />
        <Route element={<ResetPasswordPage />} path="/reset-password/:token" />
        <Route element={<Navigate replace to="/" />} path="*" />
      </Routes>

      <Toaster
        duration={2000}
        position="top-center"
        toastOptions={{
          error: { iconTheme: { primary: "#f87171", secondary: "#18181b" } },
          style: {
            background: "#18181b",
            border: "1px solid #27272a",
            borderRadius: "12px",
            color: "#e4e4e7",
          },
          success: { iconTheme: { primary: "#34d399", secondary: "#18181b" } },
        }}
      />
    </div>
  );
}

export default App;
