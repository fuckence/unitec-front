// src/pages/user/UserMainPage.tsx
import { Outlet } from "react-router-dom";
import MobileFooter from "../../components/layouts/MobileFooter";
import MobileHeader from "../../components/layouts/MobileHeader";

const UserMainPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="top-0 z-20 bg-white/90 backdrop-blur-b">
        <MobileHeader />
      </header>

      {/* Content */}
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 pt-4 pb-20">
        <Outlet />
      </main>

      {/* Mobile footer */}
      <div className="sm:hidden">
        <MobileFooter />
      </div>
    </div>
  );
};

export default UserMainPage;
