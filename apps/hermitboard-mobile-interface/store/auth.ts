import create from 'zustand'
import { persist } from "zustand/middleware"
import { immer } from 'zustand/middleware/immer'
import { secureStorage } from './secure-storage';

interface AuthState {
  sessionID: string;
  userID: string;
}

export const useAuthStore = create<AuthState>()(
  immer(
    persist((set) => ({
      sessionID: "",
      userID: "",
    }),
    {
      name: "auth-storage",
      getStorage: () => secureStorage,
    })
  ))
