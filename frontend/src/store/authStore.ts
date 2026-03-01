import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  _id: string;
  email: string;
  role: string;
  profile: {
    firstName: string;
    lastName: string;
    phone?: string;
  };
  pregnancyInfo?: {
    isPregnant: boolean;
    currentWeek?: number;
    currentMonth?: number;
    dueDate?: string;
  };
  location?: {
    city?: string;
    state?: string;
    country?: string;
  };
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        set({ user, token });
      },
      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ user: null, token: null });
      },
      updateUser: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        set({ user });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
