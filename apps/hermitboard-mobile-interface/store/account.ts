import { Account } from "./../types/account";
import AsyncStorage from "@react-native-async-storage/async-storage";
import create from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Appearance } from "react-native";

export interface AccountStoreState {
  account?: Account;
}

export const useAccountStore = create<AccountStoreState>()(
  immer(
    persist((set) => ({}), {
      name: "account-storage",
      getStorage: () => AsyncStorage,
    })
  )
);
