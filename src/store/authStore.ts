// src/store/authStore.ts
import { create } from "zustand"

export type UserRole = "admin" | "user"

export interface User {
  id: string
  name: string
  role: UserRole
}

interface AuthState {
  me: User | null
  setMe: (user: User) => void
  clearMe: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  me: null,
  setMe: (user) => set({ me: user }),
  clearMe: () => set({ me: null }),
}))
