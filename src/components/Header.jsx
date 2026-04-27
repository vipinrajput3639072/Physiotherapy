import { Bell, Search, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';

const Header = ({ user, logout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm sticky top-0 z-40">
      <div className="website-shell flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <button className="p-2 md:hidden">
            <Menu className="w-6 h-6" />
          </button>
          
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-xl hidden md:flex">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search patients, appointments..."
              className="bg-transparent outline-none text-sm"
            />
          </div>
          <button className="p-2">
            <Bell className="w-6 h-6 text-gray-600" />
          </button>
          {user ? (
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-medium hover:shadow-lg transition-all"
            >
              Logout
            </button>
          ) : (
            <LoginModal />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

