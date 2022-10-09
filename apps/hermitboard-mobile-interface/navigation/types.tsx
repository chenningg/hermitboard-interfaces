import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";

// Type checking for prop types for navigator and screens.
export type NotSignedInRootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type SignedInRootTabParamList = {
  Home: undefined;
  Account: undefined;
};

// Extends screen prop types with navigation and route props.
export type NotSignedInRootStackLoginScreenProps = StackScreenProps<
  NotSignedInRootStackParamList,
  "Login",
  "NotSignedInRootStack"
>;

export type NotSignedInRootStackRegisterScreenProps = StackScreenProps<
  NotSignedInRootStackParamList,
  "Register",
  "NotSignedInRootStack"
>;

export type NotSignedInRootStackForgotPasswordScreenProps = StackScreenProps<
  NotSignedInRootStackParamList,
  "ForgotPassword",
  "NotSignedInRootStack"
>;

export type SignedInRootTabHomeScreenProps = BottomTabScreenProps<
  SignedInRootTabParamList,
  "Home",
  "SignedInRootTab"
>;
