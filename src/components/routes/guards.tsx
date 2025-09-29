// пример: ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import type { UserRole } from "../../store/userStore";

const BYPASS = import.meta.env.VITE_BYPASS_GUARDS === "true";

const ProtectedRoute = ({
  children,
  allowedRole,
}: {
  children: React.ReactElement;
  allowedRole: UserRole;
}) => {
  if (BYPASS) return children; // пропуск во время фронт-работ

  const me = useAuthStore((s) => s.me);
  if (!me) return <Navigate to="/" replace />;
  if (me.role !== allowedRole) return <Navigate to={`/${me.role}/home`} replace />;
  return children;
};

export default ProtectedRoute;
