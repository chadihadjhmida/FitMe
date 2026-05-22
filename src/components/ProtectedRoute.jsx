import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../pages/useUser";
import { useEffect } from "react";
import Spinner from "./Spinner";

export function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login", {
        replace: true,
        state: { from: location },
      });
    }
  }, [isAuthenticated, isLoading, navigate, location]);

  if (isLoading) return <Spinner />;

  if (isAuthenticated) return children;

  return null;
}
