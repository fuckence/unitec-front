// src/pages/user/user-main-pages/HomePage.tsx
import { Link } from "react-router-dom";
import { FileText, FileCheck, ClipboardList, FolderOpen, Settings } from "lucide-react";

const ActionCard = ({
  to,
  title,
  Icon,
}: {
  to: string;
  title: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) => (
  <Link
    to={to}
    className="group flex flex-col items-center justify-center rounded-xl border border-blue-200 bg-white p-4 shadow-sm transition-all hover:shadow-lg hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 group-hover:bg-blue-100">
      <Icon className="h-6 w-6 text-blue-600" aria-hidden />
    </div>
    <span className="mt-2 text-sm font-semibold text-gray-900 group-hover:text-blue-700">
      {title}
    </span>
  </Link>
);

const UserHomePage = () => {
  return (
    <>
      <h1 className="text-xl font-bold tracking-tight text-gray-900">Добро пожаловать!</h1>
      <p className="mt-2 text-gray-600 text-sm">
        Это ваша платформа для подачи заявок: создавайте обращения, отслеживайте статус и оперативно общайтесь с поддержкой — всё в одном месте.
      </p>

      <h2 className="mt-4 font-bold">Вы можете оставить заявку по следующим системам:</h2>

      <section aria-label="Быстрые действия" className="mt-6 grid grid-cols-2 gap-4">
        <ActionCard to="/sep" title="СЭП" Icon={FileText} />
        <ActionCard to="/e-otinish" title="Е-отиниш" Icon={FileCheck} />
        <ActionCard to="/odo" title="Одо" Icon={ClipboardList} />
        <ActionCard to="/ipgo" title="ИПГО" Icon={FolderOpen} />
        <ActionCard to="/stui" title="СТУИ" Icon={Settings} />
      </section>
    </>
  );
};

export default UserHomePage;
