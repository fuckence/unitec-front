// components/layouts/MobileFooter.tsx
import { Home, FileText, MessageSquare, MoreHorizontal } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const tabs = [
  { key: "home",     label: "Главная",    icon: Home,           href: "/user/home" },
  { key: "requests", label: "Заявки",     icon: FileText,       href: "/user/requests" },
  { key: "messages", label: "Сообщения",  icon: MessageSquare,  href: "/user/messages" },
  { key: "more",     label: "Другое",     icon: MoreHorizontal, href: "/user/more" },
];

const MobileFooter = () => {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-10 pb-safe transition-transform duration-300 ${mounted ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="bg-white border-t border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
        <div className="max-w-md mx-auto px-2">
          <div className="grid grid-cols-4 relative">
            {tabs.map(({ key, label, icon: Icon, href }) => {
              const active = location.pathname.startsWith(href);
              return (
                <Link key={key} to={href} className="relative group">
                  <div className="flex flex-col items-center justify-center py-2 px-1">
                    <div className={`p-1.5 rounded-full transition-colors ${active ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}`}>
                      <Icon strokeWidth={active ? 2.5 : 2} className="h-5 w-5" />
                    </div>
                    <span className={`text-[10px] font-medium transition-colors ${active ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}`}>
                      {label}
                    </span>
                    {active && <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-600" />}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MobileFooter;
// В глобальные стили можно добавить:
// .pb-safe { padding-bottom: env(safe-area-inset-bottom, 0px); }
