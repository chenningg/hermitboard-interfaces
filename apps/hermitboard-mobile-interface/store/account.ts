import AsyncStorage from "@react-native-async-storage/async-storage";
import create from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Appearance } from "react-native";

export interface AccountState {
  id: string;
  nickname: string;
  email: string;
}

export const useAccountStore = create<AccountState>()(
  immer(
    persist(
      (set) => ({
        id: "",
        nickname: "",
        email: "",
      }),
      {
        name: "app-settings-storage",
        getStorage: () => AsyncStorage,
      }
    )
  )
);
