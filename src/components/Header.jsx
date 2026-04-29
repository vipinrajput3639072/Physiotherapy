import React, { useState, useRef, useEffect } from "react";
import { Bell, Search, Menu, LogOut, User, Settings, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";

const Header = ({ user, logout }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm sticky top-0 z-40">
      <div className="website-shell flex items-center justify-between py-4">
        
        {/* Left Side: Mobile Menu */}
        <div className="flex items-center gap-4">
          <button className="p-2 md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Right Side: Search, Notifications & Profile Dropdown */}
        <div className="flex items-center gap-4">
          
          {/* Search Bar */}
          <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-xl hidden md:flex">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search patients..."
              className="bg-transparent outline-none text-sm"
            />
          </div>

          {/* Notifications */}
          <button className="p-2 relative hover:bg-gray-50 rounded-full transition-colors">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>

          {/* User Auth Section */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              {/* Trigger Button */}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 pl-2 pr-4 py-1.5 bg-white border border-gray-100 rounded-full hover:shadow-md transition-all active:scale-95"
              >
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                  {user.name ? user.name.charAt(0) : "D"}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-[12px] font-bold text-gray-800 leading-none">
                    {user.name || "Doctor"}
                  </p>
                  <p className="text-[10px] text-gray-400 font-medium">Admin</p>
                </div>
                <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50 py-2 animate-in fade-in zoom-in duration-150 origin-top-right">
                  <div className="px-4 py-3 border-b border-gray-50 mb-1">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Account</p>
                  </div>
                  
                  <button className="flex w-full items-center gap-3 px-4 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all text-sm font-semibold">
                    <User size={18} />
                    <span>My Profile</span>
                  </button>

                  <button className="flex w-full items-center gap-3 px-4 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all text-sm font-semibold">
                    
                    <Settings size={18} />
                    <span>Settings</span>
                  </button>

                  <div className="h-[1px] bg-gray-50 my-1"></div>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-rose-500 hover:bg-rose-50 transition-all text-sm font-bold"
                  >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <LoginModal />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;