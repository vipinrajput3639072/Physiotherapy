import { Outlet } from "react-router-dom";
import Header from "./Header";
import AdminSidebar from "./AdminSidebar";
import useAuthStore from "../stores/authStore";

const AdminLayout = () => {
  const { user, logout } = useAuthStore();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-gray-50">
      <Header user={user} logout={logout} />
      <div className="flex flex-col md:flex-row">
        <AdminSidebar />
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
