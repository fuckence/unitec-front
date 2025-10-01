export const API_CONFIG = {
  BASE_URL: "http://localhost:8000",
  ENDPOINTS: {
    REGISTER: "/api/users/register",
    AUTH: "/api/aitu/auth",
    USER_STATUS: "/api/users/:id/status"
  }
};

export const getApiUrl = (endpoint?: string): string => {
  const base = API_CONFIG.BASE_URL;
  return endpoint ? `${base}${endpoint}` : base;
};