import {
  AssetClassValue,
  AssetClass,
  AuthRole,
  AuthRoleValue,
  AuthType,
  AuthTypeValue,
  SourceType,
  SourceTypeValue,
  TransactionType,
  TransactionTypeValue,
} from "../graphql/generated/index";
import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { InitializeDataQuery } from "../graphql/generated";

export interface InitialDataStoreState {
  assetClasses?: Map<AssetClassValue, Pick<AssetClass, "id" | "value">>;
  authRoles?: Map<AuthRoleValue, Pick<AuthRole, "id" | "value">>;
  authTypes?: Map<AuthTypeValue, Pick<AuthType, "id" | "value">>;
  sourceTypes?: Map<SourceTypeValue, Pick<SourceType, "id" | "value">>;
  transactionTypes?: Map<
    TransactionTypeValue,
    Pick<TransactionType, "id" | "value">
  >;
  sources?: Pick<InitializeDataQuery, "sources">;
}

export interface InitialDataStoreActions {
  setInitialData: (data: InitializeDataQuery) => void;
  reset: () => void;
}

const initialState: InitialDataStoreState = {
  assetClasses: undefined,
  authRoles: undefined,
  authTypes: undefined,
  sourceTypes: undefined,
  transactionTypes: undefined,
  sources: undefined,
};

export const useInitialDataStore = create<
  InitialDataStoreState & InitialDataStoreActions
>()(
  immer((set, get) => ({
    ...initialState,
    setInitialData: (data: InitializeDataQuery) => {
      let assetClassesMap = data.assetClasses
        ? new Map<AssetClassValue, Pick<AssetClass, "id" | "value">>()
        : undefined;
      data.assetClasses?.edges?.forEach((edge) => {
        if (edge?.node) {
          assetClassesMap?.set(edge?.node?.value, edge?.node);
        }
      });

      let authRolesMap = data.assetClasses
        ? new Map<AuthRoleValue, Pick<AuthRole, "id" | "value">>()
        : undefined;
      data.authRoles?.edges?.forEach((edge) => {
        if (edge?.node) {
          authRolesMap?.set(edge?.node?.value, edge?.node);
        }
      });

      let authTypesMap = data.authTypes
        ? new Map<AuthTypeValue, Pick<AuthType, "id" | "value">>()
        : undefined;
      data.authTypes?.edges?.forEach((edge) => {
        if (edge?.node) {
          authTypesMap?.set(edge?.node?.value, edge?.node);
        }
      });

      let sourceTypesMap = data.sourceTypes
        ? new Map<SourceTypeValue, Pick<SourceType, "id" | "value">>()
        : undefined;
      data.sourceTypes?.edges?.forEach((edge) => {
        if (edge?.node) {
          sourceTypesMap?.set(edge?.node?.value, edge?.node);
        }
      });

      let transactionTypesMap = data.transactionTypes
        ? new Map<TransactionTypeValue, Pick<TransactionType, "id" | "value">>()
        : undefined;
      data.transactionTypes?.edges?.forEach((edge) => {
        if (edge?.node) {
          transactionTypesMap?.set(edge?.node?.value, edge?.node);
        }
      });

      set({
        assetClasses: assetClassesMap,
        authRoles: authRolesMap,
        authTypes: authTypesMap,
        sourceTypes: sourceTypesMap,
        transactionTypes: transactionTypesMap,
        sources: data.sources as Pick<InitializeDataQuery, "sources">,
      });
    },
    reset: () => {
      set(initialState);
    },
  }))
);
