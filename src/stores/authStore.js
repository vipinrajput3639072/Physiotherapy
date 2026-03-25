import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      login: (userData) => set({ user: userData }),
      logout: () => set({ user: null }),
      isAuthenticated: (requiredRole = null) => {
        const { user } = get();
        return Boolean(user) && (!requiredRole || user.role === requiredRole);
      },
    }),
    {
      name: 'physiohub-auth',
      partialize: (state) => ({ user: state.user }),
    },
  ),
);

export default useAuthStore;

