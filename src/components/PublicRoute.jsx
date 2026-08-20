import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const storedAuth = localStorage.getItem("resicareAuth");

  if (!storedAuth) {
    return <Outlet />;
  }

  try {
    const auth = JSON.parse(storedAuth);

    if (!auth || typeof auth !== "object") {
      localStorage.removeItem("resicareAuth");
      return <Outlet />;
    }

    if (!auth.token || !auth.expiresAt) {
      localStorage.removeItem("resicareAuth");
      return <Outlet />;
    }

    const expiresAt = Number(auth.expiresAt);

    if (
      !Number.isFinite(expiresAt) ||
      Date.now() >= expiresAt
    ) {
      localStorage.removeItem("resicareAuth");
      return <Outlet />;
    }

    return <Navigate to="/home" replace />;
  } catch (error) {
    console.error("Invalid authentication data:", error);

    localStorage.removeItem("resicareAuth");

    return <Outlet />;
  }
}