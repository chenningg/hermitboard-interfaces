import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { AuthType } from "../types/auth-type";
import { AuthRole } from "../types/auth-role";
import { Connection } from "../types/connection";
import { Portfolio } from "../types/portfolio";
import { Friend } from "../types/friend";

export interface AccountStoreState {
  id?: string;
  nickname?: string;
  email?: string;
  emailConfirmed?: boolean;
  passwordUpdatedAt?: Date;
  authType?: AuthType;
  connections?: Connection[];
  portfolios?: Portfolio[];
  friends?: Friend[];
}

export interface AccountStoreActions {
  updateAccountState: (account: AccountStoreState) => void;
  reset: () => void;
}

const initialState: AccountStoreState = {
  id: "",
  nickname: "",
  email: "",
  emailConfirmed: undefined,
  passwordUpdatedAt: undefined,
  authType: undefined,
  connections: undefined,
  portfolios: undefined,
  friends: undefined,
};

export const useAccountStore = create<
  AccountStoreState & AccountStoreActions
>()(
  immer((set) => ({
    ...initialState,
    updateAccountState: (account: AccountStoreState) => {
      set(account);
    },
    reset: () => {
      set(initialState);
    },
  }))
);
