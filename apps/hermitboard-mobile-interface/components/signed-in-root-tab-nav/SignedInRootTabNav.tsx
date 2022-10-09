import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../../views/HomeScreen";
import { AccountScreen } from "../../views/AccountScreen";
import { SignedInRootTabParamList } from "../../navigation/types";
import { SignedInRootTabBar } from "./SignedInRootTabBar";
import { SignedInRootTabBarIcon } from "./SignedInRootTabBarIcon";
import { SignedInRootTabBarLabel } from "./SignedInRootTabBarLabel";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Create the root tab navigator.
const SignedInRootTab = createBottomTabNavigator<SignedInRootTabParamList>();

export function SignedInRootTabNav() {
  return (
    <>
      <SignedInRootTab.Navigator
        id="SignedInRootTab"
        initialRouteName="Home"
        tabBar={(props) => <SignedInRootTabBar {...props} />}
      >
        <SignedInRootTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <SignedInRootTabBarIcon
                  focused={focused}
                  iconLibrary={MaterialCommunityIcons}
                  iconName="home"
                  iconFocusedName="home-outline"
                />
              );
            },
            tabBarLabel: ({ focused }) => {
              return <SignedInRootTabBarLabel focused={focused} label="Home" />;
            },
          }}
        />
        <SignedInRootTab.Screen
          name="Account"
          component={AccountScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <SignedInRootTabBarIcon
                  focused={focused}
                  iconLibrary={MaterialCommunityIcons}
                  iconName="account"
                  iconFocusedName="account-outline"
                />
              );
            },
            tabBarLabel: ({ focused }) => {
              return (
                <SignedInRootTabBarLabel focused={focused} label="Account" />
              );
            },
          }}
        />
      </SignedInRootTab.Navigator>
    </>
  );
}
