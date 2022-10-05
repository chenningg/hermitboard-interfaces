import create from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { secureStorage } from "./secure-storage";

export interface AuthState {
  token: string;
  refreshToken: string;
}

export const useAuthStore = create<AuthState>()(
  immer(
    persist(
      (set) => ({
        token: "",
        refreshToken: "",
      }),
      {
        name: "auth-storage",
        getStorage: () => secureStorage,
      }
    )
  )
);
