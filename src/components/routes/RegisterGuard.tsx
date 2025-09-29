// RegisterGuard.tsx
import { Outlet, Navigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import { useAuthStore } from "../../store/authStore";

const BYPASS = import.meta.env.VITE_BYPASS_GUARDS === "true";

const RegisterGuard = () => {
  if (BYPASS) return <Outlet />;

  const me = useAuthStore((s) => s.me);
  if (me) return <Navigate to={`/${me.role}/home`} replace />;

  const role = useUserStore((s) => s.role);
  return role ? <Outlet /> : <Navigate to="/" replace />;
};

export default RegisterGuard;
