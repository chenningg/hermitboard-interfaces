import create from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { secureStorage } from "./secure-storage";
import { AuthRoleValue } from "../types/auth-role";
import { SESSION_TOKEN } from "@env";

export interface AuthStoreState {
  sessionToken?: string;
  userID?: string;
  authRoles?: AuthRoleValue[];
  isLoggedIn: boolean;
  _hasHydrated: boolean;
}

export interface AuthStoreActions {
  updateAuthState: (
    sessionToken: string,
    userID: string,
    authRoles: AuthRoleValue[]
  ) => void;
  reset: () => void;
  setHasHydrated: (status: boolean) => void;
}

const initialState: AuthStoreState = {
  sessionToken: undefined,
  userID: undefined,
  authRoles: undefined,
  isLoggedIn: false,
  _hasHydrated: false,
};

export const useAuthStore = create<AuthStoreState & AuthStoreActions>()(
  immer(
    persist(
      (set) => ({
        ...initialState,
        updateAuthState: (
          sessionToken: string,
          userID: string,
          authRoles: AuthRoleValue[]
        ) => {
          set({
            sessionToken: sessionToken,
            userID: userID,
            authRoles: authRoles,
            isLoggedIn:
              sessionToken && userID && authRoles && authRoles.length > 0
                ? true
                : false,
          });
        },
        reset: () => {
          set(initialState);
        },
        setHasHydrated: (status) => {
          set({
            _hasHydrated: status,
          });
        },
      }),
      {
        name: "auth-storage",
        getStorage: () => secureStorage,
        partialize: (state) => ({
          sessionToken: state.sessionToken,
          userID: state.userID,
          authRoles: state.authRoles,
          isLoggedIn: state.isLoggedIn,
        }),
        onRehydrateStorage: (state) => (state) => {
          // Disable rehydration temporarily.
          // TODO: REMOVE!
          state?.reset();
          state?.updateAuthState(
            SESSION_TOKEN,
            "ACC_01GEGJGGJHXB9FWZ84SPKCVFG8",
            [AuthRoleValue.Pro]
          );
          state?.setHasHydrated(true);
        },
      }
    )
  )
);
