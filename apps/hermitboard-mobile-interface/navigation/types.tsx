import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

// Type checking for prop types for navigator and screens.
export type RootTabParamList = {
  Home: undefined;
  Account: undefined;
};

// Extends screen prop types with navigation and route props.
export type RootTabScreenProps<T extends keyof RootTabParamList> =
  BottomTabScreenProps<RootTabParamList, T>;
