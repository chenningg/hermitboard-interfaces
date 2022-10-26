import { createStackNavigator } from "@react-navigation/stack";
import { NotSignedInRootStackParamList } from "../../navigation/types";
import { LoginScreen } from "../../views/LoginScreen";
import { RegisterScreen } from "../../views/RegisterScreen";
import { NotSignedInRootStackHeader } from "./NotSignedInRootStackHeader";
import React from "react";
import { ForgotPasswordScreen } from "../../views/ForgotPasswordScreen";

const NotSignedInRootStack =
  createStackNavigator<NotSignedInRootStackParamList>();

export function NotSignedInRootStackNav() {
  return (
    <NotSignedInRootStack.Navigator
      id="NotSignedInRootStack"
      initialRouteName="Login"
      screenOptions={{
        headerMode: "screen",
      }}
    >
      <NotSignedInRootStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          header: (props) =>
            NotSignedInRootStackHeader({
              ...props,
              visible: false,
              bgColor: { light: "coolGray.50", dark: "coolGray.800" },
              tintColor: { light: "darkText", dark: "lightText" },
            }),
        }}
      />
      <NotSignedInRootStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          header: (props) =>
            NotSignedInRootStackHeader({
              ...props,
              visible: true,
              bgColor: { light: "coolGray.50", dark: "coolGray.800" },
              tintColor: { light: "darkText", dark: "lightText" },
              direction: "top",
            }),
        }}
      />
      <NotSignedInRootStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          header: (props) =>
            NotSignedInRootStackHeader({
              ...props,
              visible: true,
              bgColor: { light: "coolGray.50", dark: "coolGray.800" },
              tintColor: { light: "darkText", dark: "lightText" },
              direction: "top",
            }),
        }}
      />
    </NotSignedInRootStack.Navigator>
  );
}
