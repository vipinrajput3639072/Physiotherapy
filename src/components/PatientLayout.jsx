import { Outlet } from 'react-router-dom';
import PatientSidebar from './PatientSidebar';
import Header from './Header'; // Ensure the filename matches
import useAuthStore from '../stores/authStore'; // Import your store

const PatientLayout = () => {
  // 1. Extract user and logout from your store
  const { user, logout } = useAuthStore();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      
      {/* Sidebar: Left Side */}
      <div className="hidden md:flex md:w-64 md:flex-col flex-shrink-0">
        <PatientSidebar />
      </div>

      {/* Main Content Area: Right Side */}
      <main className="flex-1 h-full overflow-y-auto no-scrollbar flex flex-col">
        
        {/* 2. Header placed inside the main flow, passing the required props */}
        <Header user={user} logout={logout} />

        {/* Dashboard Content */}
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default PatientLayout;