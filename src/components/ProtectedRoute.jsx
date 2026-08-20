import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const storedAuth = localStorage.getItem("resicareAuth");

  if (!storedAuth) {
    return <Navigate to="/login" replace />;
  }

  try {
    const auth = JSON.parse(storedAuth);

    if (!auth || typeof auth !== "object") {
      localStorage.removeItem("resicareAuth");
      return <Navigate to="/login" replace />;
    }

    if (!auth.token) {
      localStorage.removeItem("resicareAuth");
      return <Navigate to="/login" replace />;
    }

    if (!auth.expiresAt) {
      localStorage.removeItem("resicareAuth");
      return <Navigate to="/login" replace />;
    }

    const expiresAt = Number(auth.expiresAt);

    if (
      !Number.isFinite(expiresAt) ||
      Date.now() >= expiresAt
    ) {
      localStorage.removeItem("resicareAuth");
      return <Navigate to="/login" replace />;
    }

    return <Outlet />;
  } catch (error) {
    console.error("Invalid authentication data:", error);

    localStorage.removeItem("resicareAuth");

    return <Navigate to="/login" replace />;
  }
}