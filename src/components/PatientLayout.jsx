import { Outlet } from 'react-router-dom';
import Header from './Header';
import PatientSidebar from './PatientSidebar';
import useAuthStore from '../stores/authStore';

const PatientLayout = () => {
  const { user, logout } = useAuthStore();
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      <Header user={user} logout={logout} />
      <div className="flex flex-col md:flex-row">
        <PatientSidebar />
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PatientLayout;

