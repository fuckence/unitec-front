// // src/pages/RoleSelection.tsx
// import { useNavigate } from "react-router-dom";
// import { useUserStore } from "../store/userStore";
// import type { UserRole } from "../store/userStore";
// import { useTranslation } from "react-i18next";
// import { LanguageSwitcher } from "../components/LanguageSwitcher";
// import { ChevronRight } from "lucide-react";

// const RoleSelection = () => {
//   const navigate = useNavigate();
//   const setRole = useUserStore((state) => state.setRole);
//   const { t } = useTranslation();

//   const handleRoleSelect = (role: UserRole) => {
//     setRole(role);
//     if (role === "user") {
//       navigate("/register");
//     } else if (role === "admin") {
//       navigate("/admin/login");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Переключатель языка в правом верхнем углу */}
//       <div className="absolute top-4 right-4">
//         <LanguageSwitcher />
//       </div>

//       <div className="flex flex-col items-center justify-center flex-1 px-4 py-8">
//         {/* Логотип */}
//         <div className="mb-6 w-32 h-20 rounded-full flex items-center justify-center">
//           <img
//             className="text-3xl"
//             src="public/images/solo nitec logo.png"
//             alt="logo"
//           />
//         </div>

//         <div className="p-6 ">
//           <h1 className="text-2xl bold text-gray-900 text-center mb-2">
//             {t("roleSelection.title")}
//           </h1>

//           {/* Ознакомительный текст */}
//           <p className="text-sm text-center text-gray-500 mb-6">
//             {t(
//               "roleSelection.introText",
//               "Единая платформа для подачи и оброботки заявок техподдержки госслужащих"
//             )}
//           </p>
//         </div>

//         <div className="mb-6 h-40 bg-gray-100 rounded-md flex items-center justify-center">
//           <img src="public/images/just.jpg" alt="" />
//         </div>

//         {/* Кнопки выбора роли */}
//         <div className="mt-10 w-full">
//           <div className="space-y-3 w-full">
//             <button
//               onClick={() => handleRoleSelect("admin")}
//               className="w-full py-3 px-4 rounded-md border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 flex items-center justify-between"
//             >
//               <span>
//                 {t("roleSelection.admins", "Вход для работников АО НИТ")}
//               </span>
//               <ChevronRight size={20} className="text-gray-400" />
//             </button>

//             <button
//               onClick={() => handleRoleSelect("user")}
//               className="w-full py-3 px-4 rounded-md border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 flex items-center justify-between"
//             >
//               <span>{t("roleSelection.users", "Вход для заявителей")}</span>
//               <ChevronRight size={20} className="text-gray-400" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoleSelection;


// src/pages/RoleSelection.tsx
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { ChevronRight } from "lucide-react";
import aituBridge from '@btsd/aitu-bridge';
import { useEffect, useState } from "react";
import AituPhoneTest from "../components/AituPhoneTest";

const RoleSelection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleRoleSelect = (role: "admin" | "user") => {
    if (role === "admin") navigate("/admin/login");
    if (role === "user") navigate("/register");
  };

  async function getData() {
  try {
    const data = await aituBridge.getMe();
    // setDate(data);
    console.log(data);
  } catch (e) {
    console.log('ssss');
  }
}

  useEffect(()=>{
    getData()
  },[])

  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <div><AituPhoneTest /></div>
      <div className="flex flex-col items-center justify-center flex-1 px-4 py-8 max-[380px]:mt-[10vh] ">
        <div className="mb-6 w-32 h-20 rounded-full flex items-center justify-center">
          <img className="text-3xl" src="public/images/solo nitec logo.png" alt="logo" />
        </div>

        <div className="p-6 z-10">
          <h1 className="text-2xl bold text-gray-900 text-center mb-2">
            {t("roleSelection.title")}
          </h1>
          <p className="text-sm text-center text-gray-500 mb-6">
            {t(
              "roleSelection.introText",
              "Единая платформа для подачи и оброботки заявок техподдержки госслужащих"
            )}
          </p>
        </div>

        <div className="mb-6 h-40 bg-gray-100 rounded-md flex items-center justify-center">
          <img src="public/images/just.jpg" alt="" />
        </div>

        <div className="mt-10 w-full">
          <div className="space-y-3 w-full">
            <button
              onClick={() => handleRoleSelect("admin")}
              className="w-full py-3 px-4 rounded-md border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 flex items-center justify-between"
            >
              <span>{t("roleSelection.admins", "Вход для работников АО НИТ")}</span>
              <ChevronRight size={20} className="text-gray-400" />
            </button>

            <button
              onClick={() => handleRoleSelect("user")}
              className="w-full py-3 px-4 rounded-md border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 flex items-center justify-between"
            >
              <span>{t("roleSelection.users", "Вход для заявителей")}</span>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
