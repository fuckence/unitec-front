// // src/App.tsx
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// // страницы
// import RoleSelection from "./pages/RoleSelection";
// import UserRegisterPage from "./pages/user/UserRegisterPage";
// import AdminLoginPage from "./pages/admin/AdminLoginPage";
// import UserMainPage from "./pages/user/UserMainPage";

// // гарды
// import ProtectedRoute from "./components/routes/ProtectedRoute";
// import PublicOnly from "./components/routes/PublicOnly";
// import RegisterGuard from "./components/routes/RegisterGuard";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* выбор роли */}
//         <Route element={<PublicOnly />}>
//           <Route path="/" element={<RoleSelection />} />
//         </Route>

//         {/* регистрация */}
//         <Route element={<RegisterGuard />}>
//           <Route path="/register" element={<UserRegisterPage />} />
//         </Route>

//         {/* вход админа */}
//         <Route path="/admin/login" element={<AdminLoginPage />} />

//         {/* защищённая страница пользователя */}
//         <Route
//           path="/user/home"
//           element={
//             <ProtectedRoute allowedRole="user">
//               <UserMainPage />
//             </ProtectedRoute>
//           }
//         />

//         {/* fallback */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;


// src/App.tsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RoleSelection from "./pages/RoleSelection";
import AdminLoginPage from "./pages/admin/AdminLoginPage";

// готовые страницы пользователя
import UserRegisterPage from "./pages/user/register/UserRegisterPage";
import UserMainPage from "./pages/user/UserMainPage"; // <-- layout
import UserHomePage from "./pages/user/user-main-pages/user-home-page/UserHomePage";
import UserMorePage from "./pages/user/user-main-pages/user-more-page/UserMorePage";
// import RequestsPage from "./pages/user/user-main-pages/RequestsPage";
// import MessagesPage from "./pages/user/user-main-pages/MessagesPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* публичные */}
        <Route path="/" element={<RoleSelection />} />
        <Route path="/register" element={<UserRegisterPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* layout для юзера */}
        <Route path="/user" element={<UserMainPage />}>
          <Route index element={<Navigate to="home" replace />} /> 
          <Route path="home" element={<UserHomePage />} />
          <Route path="more" element={<UserMorePage />} />
          {/* <Route path="requests" element={<RequestsPage />} /> */}
          {/* <Route path="messages" element={<MessagesPage />} /> */}
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

