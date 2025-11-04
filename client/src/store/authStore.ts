import { create } from "zustand";
import type { User } from "../types/auth";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  clearAuth: () => void;
  initAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) =>
    set(() => ({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    })),

  setLoading: (loading) => set(() => ({ isLoading: loading })),

  clearAuth: () =>
    set(() => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })),

  initAuth: () => {
    const token = localStorage.getItem("auth-token");
    const userStr = localStorage.getItem("auth-user");

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as User;
        set(() => ({
          user,
          isAuthenticated: true,
          isLoading: false,
        }));
      } catch {
        localStorage.removeItem("auth-token");
        localStorage.removeItem("auth-user");
        set(() => ({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        }));
      }
    } else {
      set(() => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      }));
    }
  },
}));
