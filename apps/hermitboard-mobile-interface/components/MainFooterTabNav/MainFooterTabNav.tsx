import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../../views/HomeScreen";
import { AccountScreen } from "../../views/AccountScreen";
import { NavigationContainer } from "@react-navigation/native";
import { RootTabParamList } from "../../navigation/types";
import { MainFooterTabBar } from "../MainFooterTabNav/MainFooterTabBar";
import { MainFooterTabBarIcon } from "./MainFooterTabBarIcon";
import { MainFooterTabBarLabel } from "./MainFooterTabBarLabel";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "native-base";
import { LabelPosition } from "@react-navigation/bottom-tabs/lib/typescript/src/types";

// Create the root tab navigator.
const RootTab = createBottomTabNavigator<RootTabParamList>();

export function MainFooterTabNav() {
  return (
    <>
      <RootTab.Navigator tabBar={(props) => <MainFooterTabBar {...props} />}>
        <RootTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <MainFooterTabBarIcon
                  focused={focused}
                  iconLibrary={MaterialCommunityIcons}
                  iconName="home"
                  iconFocusedName="home-outline"
                />
              );
            },
            tabBarLabel: ({ focused }) => {
              return <MainFooterTabBarLabel focused={focused} label="Home" />;
            },
          }}
        />
        <RootTab.Screen
          name="Account"
          component={AccountScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <MainFooterTabBarIcon
                  focused={focused}
                  iconLibrary={MaterialCommunityIcons}
                  iconName="account"
                  iconFocusedName="account-outline"
                />
              );
            },
            tabBarLabel: ({ focused }) => {
              return (
                <MainFooterTabBarLabel focused={focused} label="Account" />
              );
            },
          }}
        />
      </RootTab.Navigator>
    </>
  );
}
