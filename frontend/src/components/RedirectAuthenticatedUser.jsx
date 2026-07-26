import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return null;

  if (isAuthenticated && user?.isVerified) {
    return <Navigate replace to="/" />;
  }

  return children;
};

export default RedirectAuthenticatedUser;
