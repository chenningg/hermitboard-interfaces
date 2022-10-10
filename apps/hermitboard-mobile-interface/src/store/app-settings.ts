import AsyncStorage from "@react-native-async-storage/async-storage";
import create from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Appearance } from "react-native";

export interface AppSettingsStoreState {
  colorMode: "dark" | "light";
  _hasHydrated: boolean;
}

export interface AppSettingsStoreActions {
  toggleColorMode: () => void;
  setHasHydrated: (status: boolean) => void;
  reset: () => void;
}

const initialState: AppSettingsStoreState = {
  // Set colorMode to be the system settings else default to dark mode.
  colorMode: Appearance.getColorScheme() ?? "dark",
  _hasHydrated: false,
};

export const useAppSettingsStore = create<
  AppSettingsStoreState & AppSettingsStoreActions
>()(
  immer(
    persist(
      (set, get) => ({
        ...initialState,
        toggleColorMode: () => {
          set({ colorMode: get().colorMode === "light" ? "dark" : "light" });
        },
        setHasHydrated: (status) => {
          set({
            _hasHydrated: status,
          });
        },
        reset: () => {
          set(initialState);
        },
      }),
      {
        name: "app-settings-storage",
        getStorage: () => AsyncStorage,
        partialize: (state) => ({
          colorMode: state.colorMode,
        }),
        onRehydrateStorage: (state) => (state) => {
          state?.setHasHydrated(true);
        },
      }
    )
  )
);
