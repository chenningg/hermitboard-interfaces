import { Box, StatusBar, Text, Center, Container } from "native-base";
import React from "react";
import { SignedInRootTabHomeScreenProps } from "../navigation/types";
import { useAppSettingsStore } from "../store/app-settings";

export function HomeScreen({
  route,
  navigation,
}: SignedInRootTabHomeScreenProps) {
  const colorMode = useAppSettingsStore((state) => state.colorMode);

  return (
    <>
      <StatusBar
        backgroundColor={colorMode === "light" ? "#f9fafb" : "coolGray.800"}
        barStyle={colorMode === "light" ? "dark-content" : "light-content"}
      ></StatusBar>

      <Box
        w="100%"
        h="100%"
        bg={colorMode === "light" ? "coolGray.50" : "coolGray.900"}
      >
        <Center>
          <Container w="100%" h="100%" safeArea></Container>
        </Center>
      </Box>
    </>
  );
}
