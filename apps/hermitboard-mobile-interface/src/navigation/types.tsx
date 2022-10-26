import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";

// ====================
// NotSignedInRootStack
// ====================
export type NotSignedInRootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

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

// =====================
// SignedInRootBottomTab
// =====================
export type SignedInRootTabParamList = {
  Home: undefined;
  Budget: undefined;
  Dashboard: undefined;
  Community: undefined;
  Settings: undefined;
};

export type SignedInRootTabHomeScreenProps = BottomTabScreenProps<
  SignedInRootTabParamList,
  "Home",
  "SignedInRootTab"
>;

export type SignedInRootTabBudgetScreenProps = BottomTabScreenProps<
  SignedInRootTabParamList,
  "Budget",
  "SignedInRootTab"
>;

export type SignedInRootTabTradeScreenProps = BottomTabScreenProps<
  SignedInRootTabParamList,
  "Dashboard",
  "SignedInRootTab"
>;

export type SignedInRootTabCommunityScreenProps = BottomTabScreenProps<
  SignedInRootTabParamList,
  "Community",
  "SignedInRootTab"
>;

export type SignedInRootTabSettingsScreenProps = BottomTabScreenProps<
  SignedInRootTabParamList,
  "Settings",
  "SignedInRootTab"
>;
