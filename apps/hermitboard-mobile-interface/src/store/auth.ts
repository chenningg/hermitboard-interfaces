import { AuthRoleValue } from "../graphql/generated/graphql";
import create from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { secureStorage } from "./secure-storage";

export interface AuthStoreState {
  session?: {
    token: string;
    userID: string;
    authRoles: Map<AuthRoleValue, boolean>;
  };
  _hasHydrated: boolean;
}

export interface AuthStoreActions {
  updateAuthState: (session: {
    token: string;
    userID: string;
    authRoles: AuthRoleValue[];
  }) => void;
  reset: () => void;
  setHasHydrated: (status: boolean) => void;
}

const initialState: AuthStoreState = {
  session: undefined,
  _hasHydrated: false,
};

export const useAuthStore = create<AuthStoreState & AuthStoreActions>()(
  immer(
    persist(
      (set) => ({
        ...initialState,
        updateAuthState: (session: {
          token: string;
          userID: string;
          authRoles: AuthRoleValue[];
        }) => {
          let authRolesMap = new Map<AuthRoleValue, boolean>();
          session.authRoles.forEach((value) => {
            authRolesMap.set(value as AuthRoleValue, true);
          });
          set((state) => {
            state.session = {
              token: session.token,
              userID: session.userID,
              authRoles: authRolesMap,
            };
          });
        },
        reset: () => {
          console.log("RESET!");
          set({
            ...initialState,
            _hasHydrated: true,
          });
          //TODO: See if got bug.
          useAuthStore.persist.clearStorage();
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

          data.state.session?.authRoles?.forEach((value, key) => {
            authRolesArr.push([key, value]);
          });

          return JSON.stringify({
            ...data,
            state: {
              ...data.state,
              session: {
                authRoles: authRolesArr,
              },
            },
          });
        },
        deserialize: (value) => {
          const data = JSON.parse(value);

          // Turn auth roles string into a map.
          let authRolesMap = new Map<AuthRoleValue, boolean>();

          data.state.session?.authRoles?.forEach(
            (value: [AuthRoleValue, boolean]) => {
              let authRoleVal = value[0] as AuthRoleValue;
              authRolesMap.set(authRoleVal, value[1]);
            }
          );

          // Check that we actually have data, else set session to undefined.
          authRolesMap.size > 0
            ? (data.state.session.authRoles = authRolesMap)
            : (data.state.session = undefined);

          return data;
        },
        partialize: (state) => ({
          session: {
            token: state.session?.token,
            userID: state.session?.userID,
            authRoles: state.session?.authRoles,
          },
        }),
        onRehydrateStorage: (state) => (state) => {
          state?.setHasHydrated(true);
        },
      }
    )
  )
);
