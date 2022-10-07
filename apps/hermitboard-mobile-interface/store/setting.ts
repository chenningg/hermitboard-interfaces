import AsyncStorage from "@react-native-async-storage/async-storage";
import create from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Appearance } from "react-native";

export interface AppSettingsStoreState {
  colorMode: "dark" | "light";
}

export interface AppSettingsStoreActions {
  toggleColorMode: () => void;
  reset: () => void;
}

const initialState: AppSettingsStoreState = {
  // Set colorMode to be the system settings else default to dark mode.
  colorMode: Appearance.getColorScheme() ?? "dark",
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
        reset: () => {
          set(initialState);
        },
      }),
      {
        name: "app-settings-storage",
        getStorage: () => AsyncStorage,
      }
    )
  )
);
