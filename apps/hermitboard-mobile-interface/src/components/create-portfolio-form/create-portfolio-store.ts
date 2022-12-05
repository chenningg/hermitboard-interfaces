import { CreatePortfolioInput, Scalars } from "../../graphql/generated";
import create from "zustand";
import { immer } from "zustand/middleware/immer";

export interface CreatePortfolioFormStoreActions {
  setPortfolioDetails: (
    portfolioDetails: Pick<
      CreatePortfolioInput,
      "name" | "isPublic" | "isVisible"
    >
  ) => void;
  setConnectionIDs: (connectionIDs: Scalars["ID"][]) => void;
  reset: () => void;
}

const initialState: CreatePortfolioInput = {
  name: "",
  isPublic: false,
  isVisible: true,
  connectionIDs: [],
};

export const useCreatePortfolioFormStore = create<
  CreatePortfolioInput & CreatePortfolioFormStoreActions
>()(
  immer((set) => ({
    ...initialState,
    setPortfolioDetails: (
      portfolioDetails: Pick<
        CreatePortfolioInput,
        "name" | "isPublic" | "isVisible"
      >
    ) => {
      set({
        name: portfolioDetails.name,
        isPublic: portfolioDetails.isPublic ?? false,
        isVisible: portfolioDetails.isVisible ?? true,
      });
    },
    setConnectionIDs: (connectionIDs: Scalars["ID"][]) => {
      set({
        connectionIDs: connectionIDs.length > 0 ? connectionIDs : [],
      });
    },
    reset: () => {
      set(initialState);
    },
  }))
);
