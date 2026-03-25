"use client";
import { createElement, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';
import { User, Shield, Stethoscope } from 'lucide-react';

const roles = [
  { icon: Shield, role: 'admin', label: 'Admin Dashboard', color: 'from-blue-500 to-indigo-600' },
  { icon: User, role: 'patient', label: 'Patient Dashboard', color: 'from-green-500 to-teal-600' },
  { icon: Stethoscope, role: 'doctor', label: 'Doctor Dashboard', color: 'from-orange-500 to-red-500' },
];

const LoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = () => {
    if (selectedRole) {
      login({
        role: selectedRole,
        name: `${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} User`,
        id: `user_${Date.now()}`,
      });
      setIsOpen(false);
      setSelectedRole('');
      navigate(`/${selectedRole}`);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-2 bg-[#38b2ac] from-orange-500 to-red-500 text-white rounded-full font-medium hover:shadow-lg transition-all"
      >
        Login
      </button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md rounded-2xl bg-white/95 backdrop-blur-xl p-8 shadow-2xl">
            <Dialog.Title className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Select Your Role
            </Dialog.Title>
            <div className="space-y-4">
              {roles.map(({ icon: Icon, role, label, color }) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`w-full flex items-center gap-4 p-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] ${
                    selectedRole === role
                      ? `bg-gradient-to-r ${color} text-white shadow-orange-500/25`
                      : 'bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`p-3 rounded-xl bg-white/20 ${selectedRole === role ? 'bg-white/50' : ''}`}>
                    {createElement(Icon, { className: 'w-6 h-6' })}
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{label}</p>
                    <p className="text-sm opacity-80">{role.toUpperCase()}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-8 flex gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={handleLogin}
                disabled={!selectedRole}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
              >
                Enter Dashboard
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default LoginModal;

