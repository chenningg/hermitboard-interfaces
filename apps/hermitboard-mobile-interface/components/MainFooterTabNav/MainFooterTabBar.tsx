import React from "react";
import { HomeScreen } from "../../views/HomeScreen";
import { AccountScreen } from "../../views/AccountScreen";
import { Center, HStack, Icon, Pressable, Text } from "native-base";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function MainFooterTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <HStack bg="indigo.600" alignItems="center" safeAreaBottom shadow={6}>
      {state.routes.map((route, index) => {
        // Populate options struct.
        const { options } = descriptors[route.key];

        // Check if tab is currently focused.
        const isFocused = state.index === index;

        // On press tab handler.
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          // Allow navigation to the specified tab if we are not already there.
          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({
              name: route.name,
              params: route.params,
              merge: true,
            });
          }
        };

        // On long press handler.
        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        // Return the tab buttons.
        return (
          <Pressable flex={1}>
            <Center>
              {options.tabBarIcon}
              {options.tabBarLabel}
            </Center>
          </Pressable>
        );
      })}
    </HStack>
  );
}
