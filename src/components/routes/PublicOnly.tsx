// PublicOnly.tsx
import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const BYPASS = import.meta.env.VITE_BYPASS_GUARDS === "true";

const PublicOnly = () => {
  if (BYPASS) return <Outlet />;
  const me = useAuthStore((s) => s.me);
  return me ? <Navigate to={`/${me.role}/home`} replace /> : <Outlet />;
};

export default PublicOnly;
