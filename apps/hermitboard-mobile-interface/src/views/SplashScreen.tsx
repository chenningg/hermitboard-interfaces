import React from "react";
import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  StatusBar,
  Text,
} from "native-base";
import { useAppSettingsStore } from "../store/app-settings";

export function SplashScreen() {
  return (
    <>
      <StatusBar backgroundColor="#4338ca" barStyle="light-content"></StatusBar>

      <Box w="100%" h="100%" bg="indigo.700">
        <Center>
          <Container w="100%" h="100%" safeArea>
            <Flex w="100%" h="100%" justify="center" align="center">
              <Heading mb={1} color="lightText" size="xl">
                Hermitboard
              </Heading>
              <Text color="lightText">Money simplified.</Text>
            </Flex>
          </Container>
        </Center>
      </Box>
    </>
  );
}
