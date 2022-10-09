import React from "react";
import { Box, Center, Flex, Heading, StatusBar, Text } from "native-base";
import { useAppSettingsStore } from "../store/app-settings";

export function SplashScreen() {
  const colorMode = useAppSettingsStore((state) => state.colorMode);

  return (
    <>
      <StatusBar
        backgroundColor={colorMode === "light" ? "#4338CA" : "#111827"}
        barStyle={colorMode === "light" ? "dark-content" : "light-content"}
      ></StatusBar>

      <Flex
        w="100%"
        h="100%"
        justify="center"
        align="center"
        bg={colorMode === "light" ? "indigo.700" : "coolGray.900"}
      >
        <Heading mb={1} color="lightText" size="xl">
          Hermitboard
        </Heading>
        <Text color="lightText">Money simplified.</Text>
      </Flex>
    </>
  );
}
