import React from "react";
import {
  Box,
  Center,
  Container,
  Flex,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppSettingsStore } from "../../store/app-settings";

export function SignedInRootTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const colorMode = useAppSettingsStore((state) => state.colorMode);

  return (
    <>
      <Box
        bg={colorMode === "light" ? "coolGray.50" : "coolGray.800"}
        h="16"
        w="100%"
        borderTopWidth="1"
        borderTopColor="muted.100"
        shadow={1}
      >
        <Center>
          <Container w="100%" h="100%">
            <HStack
              w="100%"
              h="100%"
              justifyContent="space-between"
              alignItems="center"
            >
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
                  <Pressable
                    bg={colorMode === "light" ? "indigo.200" : "coolGray.800"}
                    h="100%"
                    w="16"
                    p="4"
                    key={index}
                    onPress={onPress}
                    onLongPress={onLongPress}
                  >
                    <Flex justify="center" align="center" w="100%" h="100%">
                      {options.tabBarIcon?.({
                        focused: isFocused,
                        color: "",
                        size: 1,
                      })}
                    </Flex>
                  </Pressable>
                );
              })}
            </HStack>
          </Container>
        </Center>
      </Box>
    </>
  );
}
