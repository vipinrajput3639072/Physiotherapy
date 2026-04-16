"use client";
import { createElement, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import { User, Shield, Stethoscope, Mail, Lock } from "lucide-react";

// 1. Define your fixed credentials here
const VALID_CREDENTIALS = {
  admin: { email: "admin@12.com", password: "admin123" },
  doctor: { email: "doctor@12.com", password: "doctor123" },
  patient: { email: "patient@12.com", password: "patient123" },
};

const roles = [
  {
    icon: Shield,
    role: "admin",
    label: "Admin Dashboard",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: User,
    role: "patient",
    label: "Patient Dashboard",
    color: "from-green-500 to-teal-600",
  },
  {
    icon: Stethoscope,
    role: "doctor",
    label: "Doctor Dashboard",
    color: "from-orange-500 to-red-500",
  },
];

const LoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Track error messages

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // Reset error

    // 2. Check credentials based on the selected role
    const fixedUser = VALID_CREDENTIALS[selectedRole];

    if (email === fixedUser.email && password === fixedUser.password) {
      login({
        role: selectedRole,
        email: email,
        name: `${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} User`,
      });
      setIsOpen(false);
      navigate(`/${selectedRole}`);
    } else {
      // 3. Set specific error if login fails
      setError(`Invalid email or password for ${selectedRole} access.`);
    }
  };

  const currentRole = roles.find((r) => r.role === selectedRole);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-8 py-2 bg-slate-900 text-white rounded-full font-bold hover:bg-black transition-all"
      >
        Login to Dashboard
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md w-full rounded-3xl bg-white p-8 shadow-2xl">
            <Dialog.Title className="text-2xl font-bold text-gray-900 text-center mb-6">
              Portal Access
            </Dialog.Title>

            {/* Display Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-lg text-center font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="flex p-1 bg-gray-100 rounded-xl mb-4">
                {roles.map((r) => (
                  <button
                    key={r.role}
                    type="button"
                    onClick={() => {
                      setSelectedRole(r.role);
                      setError(""); // Clear error when switching roles
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                      selectedRole === r.role
                        ? "bg-white shadow text-indigo-600"
                        : "text-gray-500"
                    }`}
                  >
                    {createElement(r.icon, { size: 14 })}
                    {r.role.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Mail
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="relative">
                <Lock
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className={`w-full py-4 text-white font-bold rounded-xl shadow-lg transition-all bg-gradient-to-r ${currentRole.color}`}
              >
                Enter {selectedRole} Dashboard
              </button>

              {/* Optional: Helper text for your testing */}
              <p className="text-[10px] text-gray-400 text-center mt-2">
                Try: {VALID_CREDENTIALS[selectedRole].email} /{" "}
                {VALID_CREDENTIALS[selectedRole].password}
              </p>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default LoginModal;
