// src/store/userStore.ts
import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

export type UserRole = 'admin' | 'user' | null

interface UserState {
  role: UserRole
  setRole: (role: UserRole) => void
  clearRole: () => void
}

// Обратите внимание на порядок применения middleware - devtools должен быть внешним
export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        role: null,
        setRole: (role) => set({ role }),
        clearRole: () => set({ role: null }),
      }),
      {
        name: 'user-storage',
      }
    ),
    {
      name: 'user-store', // Название для DevTools
    }
  )
)