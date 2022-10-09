import React from "react";
import { Box, Center, Flex, Heading, StatusBar, Text } from "native-base";
import { useAppSettingsStore } from "../store/app-settings";

export function SplashScreen() {
  return (
    <>
      <StatusBar backgroundColor="#4338ca" barStyle="light-content"></StatusBar>

      <Flex w="100%" h="100%" justify="center" align="center" bg="indigo.700">
        <Heading mb={1} color="lightText" size="xl">
          Hermitboard
        </Heading>
        <Text color="lightText">Money simplified.</Text>
      </Flex>
    </>
  );
}
