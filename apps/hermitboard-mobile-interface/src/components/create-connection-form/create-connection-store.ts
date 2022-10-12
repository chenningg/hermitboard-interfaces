import { CreateConnectionInput, Scalars } from "./../../graphql/generated/";
import create from "zustand";
import { immer } from "zustand/middleware/immer";

export interface CreateConnectionFormStoreActions {
  setSourceID: (sourceID: Scalars["ID"]) => void;
  setConnectionDetails: (
    connectionDetails: Pick<
      CreateConnectionInput,
      "accessToken" | "name" | "portfolioIDs" | "refreshToken"
    >
  ) => void;
  reset: () => void;
}

const initialState: CreateConnectionInput = {
  accessToken: "",
  name: "",
  portfolioIDs: undefined,
  refreshToken: undefined,
  sourceID: "",
};

export const useCreateConnectionFormStore = create<
  CreateConnectionInput & CreateConnectionFormStoreActions
>()(
  immer((set) => ({
    ...initialState,
    setSourceID: (sourceID: Scalars["ID"]) => {
      set({
        sourceID: sourceID,
      });
    },
    setConnectionDetails: (
      connectionDetails: Pick<
        CreateConnectionInput,
        "accessToken" | "name" | "portfolioIDs" | "refreshToken"
      >
    ) => {
      set({
        accessToken: connectionDetails.accessToken,
        name: connectionDetails.name,
        portfolioIDs: connectionDetails.portfolioIDs,
        refreshToken: connectionDetails.refreshToken,
      });
    },
    reset: () => {
      set(initialState);
    },
  }))
);
