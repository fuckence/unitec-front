import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom"

const MobileHeader = () => {
    const { t } = useTranslation();
    return(
                <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/images/solo nitec logo.png" alt="logo" className="h-6 w-auto" />
            <span className="text-xl font-semibold text-gray-800">NITEC</span>
          </div>

          {/* Быстрые ссылки (необязательно) */}
          <nav className="hidden sm:flex items-center gap-4 text-sm">
            <NavLink
              to="/user/home"
              className={({ isActive }) =>
                `px-2 py-1 rounded ${isActive ? "text-blue-600 font-medium" : "text-gray-600"}`
              }
            >
              {t("user.tabs.home", "Главная")}
            </NavLink>
            <NavLink
              to="/user/requests"
              className={({ isActive }) =>
                `px-2 py-1 rounded ${isActive ? "text-blue-600 font-medium" : "text-gray-600"}`
              }
            >
              {t("user.tabs.requests", "Заявки")}
            </NavLink>
            <NavLink
              to="/user/messages"
              className={({ isActive }) =>
                `px-2 py-1 rounded ${isActive ? "text-blue-600 font-medium" : "text-gray-600"}`
              }
            >
              {t("user.tabs.messages", "Сообщения")}
            </NavLink>
            <NavLink
              to="/user/more"
              className={({ isActive }) =>
                `px-2 py-1 rounded ${isActive ? "text-blue-600 font-medium" : "text-gray-600"}`
              }
            >
              {t("user.tabs.more", "Прочее")}
            </NavLink>
          </nav>
        </div>
    )
} 

export default MobileHeader;