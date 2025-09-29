// import React, { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { useTranslation } from "react-i18next"
// import { Mail, Lock, Eye, EyeOff, Loader2, LogIn } from "lucide-react"
// import { authenticateAdmin } from "../../services/mockAuth"
// import { useAuthStore } from "../../store/authStore"

// const AdminLoginPage: React.FC = () => {
//   const { t } = useTranslation()
//   const navigate = useNavigate()
//   const setMe = useAuthStore((s) => s.setMe)

//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [showPw, setShowPw] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [err, setErr] = useState<string | null>(null)

//   const validate = () => {
//     if (!email.trim()) {
//       setErr(t("adminLogin.errors.emailRequired", "Укажите email"))
//       return false
//     }
//     if (!password) {
//       setErr(t("adminLogin.errors.passwordRequired", "Укажите пароль"))
//       return false
//     }
//     return true
//   }

//   const onSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setErr(null)
//     if (!validate()) return

//     setLoading(true)
//     try {
//       const profile = await authenticateAdmin(email, password)
//       setMe(profile) // сохраняем только id/email/role
//       navigate("/admin/home", { replace: true })
//     } catch (error: any) {
//       setErr(t("adminLogin.errors.invalidCreds", "Неверный email или пароль"))
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-md ring-1 ring-gray-100 p-6">
//         <div className="text-center mb-4">
//           <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 mb-3">
//             <LogIn className="w-5 h-5" />
//           </div>
//           <h1 className="text-lg font-semibold text-gray-900">
//             {t("adminLogin.title", "Вход для администраторов")}
//           </h1>
//           <p className="text-sm text-gray-500">
//             {t("adminLogin.subtitle", "Введите корпоративный email и пароль")}
//           </p>
//         </div>

//         <form onSubmit={onSubmit} className="space-y-4">
//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               {t("adminLogin.email", "Email")}
//             </label>
//             <div className="relative">
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full pr-3 pl-10 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100"
//                 placeholder={t("adminLogin.emailPh", "admin@company.kz") || ""}
//               />
//               <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//             </div>
//           </div>

//           {/* Пароль */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               {t("adminLogin.password", "Пароль")}
//             </label>
//             <div className="relative">
//               <input
//                 type={showPw ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full pr-10 pl-10 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100"
//                 placeholder={t("adminLogin.passwordPh", "Пароль") || ""}
//               />
//               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <button
//                 type="button"
//                 onClick={() => setShowPw((s) => !s)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
//               >
//                 {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//               </button>
//             </div>
//           </div>

//           {/* Ошибки */}
//           {err && <div className="text-sm text-red-600">{err}</div>}

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-white font-semibold ${
//               loading
//                 ? "bg-blue-500/70 cursor-not-allowed"
//                 : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
//             }`}
//           >
//             {loading && <Loader2 className="w-5 h-5 animate-spin" />}
//             {t("adminLogin.submit", "Войти")}
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default AdminLoginPage



// src/pages/admin/AdminLoginPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mail, Lock, Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import { authenticateAdmin } from "../../services/mockAuth";

const AdminLoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const validate = () => {
    if (!email.trim()) { setErr(t("adminLogin.errors.emailRequired", "Укажите email")); return false; }
    if (!password) { setErr(t("adminLogin.errors.passwordRequired", "Укажите пароль")); return false; }
    return true;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!validate()) return;

    setLoading(true);
    try {
      await authenticateAdmin(email, password);
      // Можно сохранить флажок в sessionStorage, если надо:
      // sessionStorage.setItem("admin_logged", "1");
      navigate("/admin/home", { replace: true });
    } catch {
      setErr(t("adminLogin.errors.invalidCreds", "Неверный email или пароль"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md ring-1 ring-gray-100 p-6">
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 mb-3">
            <LogIn className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-semibold text-gray-900">
            {t("adminLogin.title", "Вход для администраторов")}
          </h1>
          <p className="text-sm text-gray-500">
            {t("adminLogin.subtitle", "Введите корпоративный email и пароль")}
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("adminLogin.email", "Email")}
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pr-3 pl-10 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder={t("adminLogin.emailPh", "admin@company.kz") || ""}
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("adminLogin.password", "Пароль")}
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pr-10 pl-10 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder={t("adminLogin.passwordPh", "Пароль") || ""}
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {err && <div className="text-sm text-red-600">{err}</div>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-white font-semibold ${
              loading
                ? "bg-blue-500/70 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            }`}
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {t("adminLogin.submit", "Войти")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;

