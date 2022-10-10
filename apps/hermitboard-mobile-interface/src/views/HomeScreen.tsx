import {
  Box,
  StatusBar,
  Text,
  Center,
  Container,
  ScrollView,
} from "native-base";
import React from "react";
import { useQuery } from "urql";
import { getAccountQueryDocument } from "../graphql/account";
import { SignedInRootTabHomeScreenProps } from "../navigation/types";
import { useAppSettingsStore } from "../store/app-settings";
import { useAuthStore } from "../store/auth";

export function HomeScreen({
  route,
  navigation,
}: SignedInRootTabHomeScreenProps) {
  const colorMode = useAppSettingsStore((state) => state.colorMode);
  const authState = useAuthStore();

  // Get user query.
  const [{ data, fetching, error }] = useQuery({
    query: getAccountQueryDocument,
    variables: {
      id: "test",
    },
  });

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
