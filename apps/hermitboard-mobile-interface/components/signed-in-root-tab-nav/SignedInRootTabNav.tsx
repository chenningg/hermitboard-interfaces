import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../../views/HomeScreen";
import { SettingsScreen } from "../../views/SettingsScreen";
import { SignedInRootTabParamList } from "../../navigation/types";
import { SignedInRootTabBar } from "./SignedInRootTabBar";
import { SignedInRootTabBarIcon } from "./SignedInRootTabBarIcon";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { SignedInRootTabHeader } from "./SignedInRootTabHeader";
import { Box } from "native-base";
import { BudgetScreen } from "../../views/BudgetScreen";
import { TradeScreen } from "../../views/TradeScreen";
import { CommunityScreen } from "../../views/CommunityScreen";

// Create the root tab navigator.
const SignedInRootTab = createBottomTabNavigator<SignedInRootTabParamList>();

export function SignedInRootTabNav() {
  return (
    <>
      <SignedInRootTab.Navigator
        id="SignedInRootTab"
        initialRouteName="Home"
        tabBar={(props) => <SignedInRootTabBar {...props} />}
        backBehavior="history"
        screenOptions={{
          tabBarShowLabel: false,
        }}
      >
        <SignedInRootTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarAccessibilityLabel: "Home screen.",
            header: ({ navigation }) => (
              <SignedInRootTabHeader
                navigation={navigation}
                visible={false}
                tintColor={{
                  light: "darkText",
                  dark: "lightText",
                }}
                bgColor={{ light: "coolGray.50", dark: "coolGray.800" }}
              />
            ),
            tabBarIcon: ({ focused }) => {
              return (
                <SignedInRootTabBarIcon
                  focused={focused}
                  iconLibrary={Octicons}
                  size={7}
                  activeIconName="home"
                  inactiveIconName="home"
                />
              );
            },
          }}
        />
        <SignedInRootTab.Screen
          name="Budget"
          component={BudgetScreen}
          options={{
            tabBarAccessibilityLabel: "Budget screen.",
            header: ({ navigation }) => (
              <SignedInRootTabHeader
                navigation={navigation}
                visible={true}
                tintColor={{
                  light: "darkText",
                  dark: "lightText",
                }}
                bgColor={{ light: "coolGray.50", dark: "coolGray.800" }}
              />
            ),
            tabBarIcon: ({ focused }) => {
              return (
                <SignedInRootTabBarIcon
                  focused={focused}
                  size={7}
                  iconLibrary={Octicons}
                  activeIconName="credit-card"
                  inactiveIconName="credit-card"
                />
              );
            },
          }}
        />
        <SignedInRootTab.Screen
          name="Trade"
          component={TradeScreen}
          options={{
            tabBarAccessibilityLabel: "Trade and watchlist screen.",
            header: ({ navigation }) => (
              <SignedInRootTabHeader
                navigation={navigation}
                visible={true}
                tintColor={{
                  light: "darkText",
                  dark: "lightText",
                }}
                bgColor={{ light: "coolGray.50", dark: "coolGray.800" }}
              />
            ),
            tabBarIcon: ({ focused }) => {
              return (
                <SignedInRootTabBarIcon
                  focused={focused}
                  size={7}
                  iconLibrary={Octicons}
                  activeIconName="graph"
                  inactiveIconName="graph"
                />
              );
            },
          }}
        />
        <SignedInRootTab.Screen
          name="Community"
          component={CommunityScreen}
          options={{
            tabBarAccessibilityLabel: "Friends and community screen.",
            header: ({ navigation }) => (
              <SignedInRootTabHeader
                navigation={navigation}
                visible={true}
                tintColor={{
                  light: "darkText",
                  dark: "lightText",
                }}
                bgColor={{ light: "coolGray.50", dark: "coolGray.800" }}
              />
            ),
            tabBarIcon: ({ focused }) => {
              return (
                <SignedInRootTabBarIcon
                  focused={focused}
                  size={7}
                  iconLibrary={Octicons}
                  activeIconName="people"
                  inactiveIconName="people"
                />
              );
            },
          }}
        />
        <SignedInRootTab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarAccessibilityLabel: "Account and settings screen.",
            header: ({ navigation }) => (
              <SignedInRootTabHeader
                navigation={navigation}
                visible={true}
                tintColor={{
                  light: "darkText",
                  dark: "lightText",
                }}
                bgColor={{ light: "coolGray.50", dark: "coolGray.800" }}
              />
            ),
            tabBarIcon: ({ focused }) => {
              return (
                <SignedInRootTabBarIcon
                  focused={focused}
                  size={7}
                  iconLibrary={Octicons}
                  activeIconName="gear"
                  inactiveIconName="gear"
                />
              );
            },
          }}
        />
      </SignedInRootTab.Navigator>
    </>
  );
}
