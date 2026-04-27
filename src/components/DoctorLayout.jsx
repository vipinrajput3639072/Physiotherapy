import { Outlet } from 'react-router-dom';
import Header from './Header';
import DoctorSidebar from './DoctorSidebar';
import useAuthStore from '../stores/authStore';

const DoctorLayout = () => {
  const { user, logout } = useAuthStore();
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header user={user} logout={logout} />
      <div className="flex flex-col md:flex-row">
        <DoctorSidebar />
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
        
      </div>
    </div>
  );
};

export default DoctorLayout;

