import AsyncStorage from "@react-native-async-storage/async-storage";
import create from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Appearance } from "react-native";

export interface AppSettingsState {
  colorMode: "dark" | "light";
}

export const useAppSettingsStore = create<AppSettingsState>()(
  immer(
    persist(
      (set) => ({
        // Set colorMode to be the system settings else default to dark mode.
        colorMode: Appearance.getColorScheme() ?? "dark",
      }),
      {
        name: "app-settings-storage",
        getStorage: () => AsyncStorage,
      }
    )
  )
);