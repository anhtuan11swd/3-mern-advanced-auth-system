import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return null;

  if (!isAuthenticated) {
    return <Navigate replace to="/login" />;
  }

  if (!user?.isVerified) {
    return <Navigate replace to="/verify-email" />;
  }

  return children;
};

export default ProtectedRoute;
