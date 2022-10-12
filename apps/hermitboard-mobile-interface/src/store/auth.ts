import { AuthRoleValue } from "../graphql/generated/index";
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
  setAuthState: (session: {
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
        setAuthState: (session: {
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
          set({
            ...initialState,
            _hasHydrated: true,
          });
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

          let sessionToSerialize = undefined;
          if (
            data.state.session &&
            data.state.session.token &&
            data.state.session.userID &&
            data.state.session.authRoles?.size > 0
          ) {
            sessionToSerialize = {
              token: data.state.session.token,
              userID: data.state.session.userID,
              authRoles: authRolesArr,
            };
          }

          return JSON.stringify({
            ...data,
            state: {
              ...data.state,
              session: sessionToSerialize,
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
          data.state.session &&
          data.state.session.token &&
          data.state.session.userID &&
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
