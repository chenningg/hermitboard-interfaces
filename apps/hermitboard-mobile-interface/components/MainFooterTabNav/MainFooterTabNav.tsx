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

// Create the root tab navigator.
const RootTab = createBottomTabNavigator<RootTabParamList>();

export function MainFooterTabNav() {
  return (
    <NavigationContainer>
      <RootTab.Navigator tabBar={(props) => <MainFooterTabBar {...props} />}>
        <RootTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }: { focused: boolean }) => {
              return (
                <MainFooterTabBarIcon
                  focused={focused}
                  iconLibrary={MaterialCommunityIcons}
                  iconName="home"
                  iconFocusedName="home-outline"
                />
              );
            },
            tabBarLabel: ({ focused }: { focused: boolean }) => {
              return <MainFooterTabBarLabel focused={focused} label="Home" />;
            },
          }}
        />
        <RootTab.Screen name="Account" component={AccountScreen} />
      </RootTab.Navigator>
    </NavigationContainer>
  );
}
