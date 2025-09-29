import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import type { UserRole } from "../../store/userStore";

const BYPASS = import.meta.env.VITE_BYPASS_GUARDS === "true";

const ProtectedRoute: React.FC<{ children: React.ReactElement; allowedRole: UserRole }> = ({ children, allowedRole }) => {
  if (BYPASS) return children; // ⬅️ пропускаем всех во время разработки

  const me = useAuthStore((s) => s.me);
  if (!me) return <Navigate to="/" replace />;
  if (me.role !== allowedRole) return <Navigate to={`/${me.role}/home`} replace />;
  return children;
};

export default ProtectedRoute;
