import type { AuthStore } from "@/schemas/userSchema"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"


// ========= Store =========

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      // Estado inicial
      user: null,
      tokens: null,
      isAuthenticated: false,

      // Guardar sesión del usuario
      setAuth: (user, tokens) => {
        set({
          user,
          tokens,
          isAuthenticated: true,
        });
      },

      // Limpiar sesión del usuario
      clearAuth: () => {
        set({
          user: null,
          tokens: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'dbonum-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
