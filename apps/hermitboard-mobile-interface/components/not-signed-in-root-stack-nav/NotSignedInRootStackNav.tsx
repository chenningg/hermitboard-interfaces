import { createStackNavigator } from "@react-navigation/stack";
import { NotSignedInRootStackParamList } from "../../navigation/types";
import { LoginScreen } from "../../views/LoginScreen";
import { RegisterScreen } from "../../views/RegisterScreen";
import { StackHeader } from "../stack-header/StackHeader";
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
            StackHeader({
              ...props,
              visible: false,
              bgColor: { light: "coolGray.100", dark: "coolGray.800" },
              tintColor: { light: "darkText", dark: "lightText" },
            }),
        }}
      />
      <NotSignedInRootStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          header: (props) =>
            StackHeader({
              ...props,
              visible: true,
              bgColor: { light: "coolGray.100", dark: "coolGray.800" },
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
            StackHeader({
              ...props,
              visible: true,
              bgColor: { light: "coolGray.100", dark: "coolGray.800" },
              tintColor: { light: "darkText", dark: "lightText" },
            }),
        }}
      />
    </NotSignedInRootStack.Navigator>
  );
}
