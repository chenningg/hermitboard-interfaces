import { AuthRoleValue } from "./../types/auth-role";
import create from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { secureStorage } from "./secure-storage";
import { SESSION_TOKEN } from "@env";

export interface AuthStoreState {
  sessionToken?: string;
  userID?: string;
  authRoles?: Map<AuthRoleValue, boolean>;
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
          let authRolesMap = new Map<AuthRoleValue, boolean>();
          authRoles.forEach((value) => {
            authRolesMap.set(value as AuthRoleValue, true);
          });
          set((state) => {
            state.sessionToken = sessionToken;
            state.userID = userID;
            state.authRoles = authRolesMap;
            state.isLoggedIn =
              sessionToken &&
              sessionToken.length == 40 &&
              userID &&
              authRoles &&
              state.authRoles.size > 0
                ? true
                : false;
          });
        },
        reset: () => {
          set({
            ...initialState,
            _hasHydrated: true,
          });
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
        serialize: (data) => {
          // Turn auth roles map into a string.
          let authRolesArr: [AuthRoleValue, boolean][] = [];
          data.state.authRoles?.forEach((value, key) => {
            authRolesArr.push([key, value]);
          });

          return JSON.stringify({
            ...data,
            state: {
              ...data.state,
              authRoles: authRolesArr,
            },
          });
        },
        deserialize: (value) => {
          const data = JSON.parse(value);

          // Turn auth roles string into a map.
          let authRolesMap = new Map<AuthRoleValue, boolean>();
          data.state.authRoles?.forEach((value: [AuthRoleValue, boolean]) => {
            let authRoleVal = value[0] as AuthRoleValue;
            authRolesMap.set(authRoleVal, value[1]);
          });
          data.state.authRoles = authRolesMap;

          return data;
        },
        partialize: (state) => ({
          sessionToken: state.sessionToken,
          userID: state.userID,
          authRoles: state.authRoles,
          isLoggedIn: state.isLoggedIn,
        }),
        onRehydrateStorage: (state) => (state) => {
          // Disable rehydration temporarily.
          // TODO: REMOVE!
          // state?.reset();
          // state?.updateAuthState(
          //   SESSION_TOKEN,
          //   "ACC_01GEGJGGJHXB9FWZ84SPKCVFG8",
          //   new Array<AuthRoleValue>(AuthRoleValue.Pro)
          // );
          state?.setHasHydrated(true);
        },
      }
    )
  )
);
