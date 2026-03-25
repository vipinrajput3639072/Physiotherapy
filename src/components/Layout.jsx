import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import useAuthStore from '../stores/authStore';

const Layout = () => {
  const { user, logout } = useAuthStore();
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <Header user={user} logout={logout} />
      <div className="flex flex-col md:flex-row">
        <Sidebar user={user} />
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

