import {
  Box,
  StatusBar,
  Text,
  Center,
  Container,
  ScrollView,
  VStack,
  Skeleton,
  Flex,
  Heading,
  HStack,
  Avatar,
  Pressable,
  Icon,
} from "native-base";
import React, { useEffect, useState } from "react";
import { useQuery } from "urql";
import {
  GetAccountByIdDocument,
  InitializeDataDocument,
} from "../graphql/generated";
import { SignedInRootTabHomeScreenProps } from "../navigation/types";
import { useAppSettingsStore } from "../store/app-settings";
import { useAuthStore } from "../store/auth";
import { useInitialDataStore } from "../store/initial-data";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CreateConnectionModal } from "../components/create-connection-form/CreateConnectionModal";

export function HomeScreen({
  route,
  navigation,
}: SignedInRootTabHomeScreenProps) {
  const colorMode = useAppSettingsStore((state) => state.colorMode);
  const userID = useAuthStore((state) => state.session?.userID);

  // Query all the enum values.
  const [initializeDataResult, initializeData] = useQuery({
    query: InitializeDataDocument,
  });

  // Get logged in account.
  const [getAccountByIDResult, getAccountByID] = useQuery({
    query: GetAccountByIdDocument,
    variables: {
      id: userID ?? "",
    },
  });

  const initialDataStore = useInitialDataStore();

  useEffect(() => {
    // Fetch enums and store it in the store.
    if (initializeDataResult.data) {
      initialDataStore.setInitialData(initializeDataResult.data);
    }
  }, [initializeDataResult.fetching]);

  // Props for creating a new connection.
  const [createConnectionModalOpen, setCreateConnectionModalOpen] =
    useState(false);

  return (
    <>
      <StatusBar
        backgroundColor={colorMode === "light" ? "#4F46E5" : "coolGray.800"}
        barStyle={colorMode === "light" ? "light-content" : "light-content"}
      ></StatusBar>

      <ScrollView
        w="100%"
        h="100%"
        flex={1}
        bg={colorMode === "light" ? "coolGray.50" : "coolGray.900"}
      >
        <Box w="100%" h="100%" safeArea>
          <Box w="100%" bg="primary.600">
            <Center w="100%">
              <Container h="48" w="100%" py={4}>
                <VStack w="100%">
                  <HStack
                    h={12}
                    w="100%"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                  >
                    <Pressable>
                      <Avatar
                        bg="primary.800"
                        mr="3"
                        size="md"
                        source={{
                          uri: getAccountByIDResult.data?.accounts.edges
                            ? getAccountByIDResult.data?.accounts.edges[0]
                              ? getAccountByIDResult.data?.accounts.edges[0]
                                  .node?.profilePictureURL ?? undefined
                              : undefined
                            : undefined,
                        }}
                      >
                        {getAccountByIDResult.data?.accounts.edges
                          ? getAccountByIDResult.data?.accounts.edges[0]
                            ? getAccountByIDResult.data?.accounts.edges[0].node?.nickname
                                .slice(0, 2)
                                .toUpperCase()
                            : "HB"
                          : "HB"}
                      </Avatar>
                    </Pressable>
                    <Pressable>
                      <Center>
                        <Icon
                          as={Ionicons}
                          name="ios-notifications"
                          color="primary.50"
                          size="md"
                          position="absolute"
                        />
                        <Box
                          position="absolute"
                          bottom={3.5}
                          right={3.5}
                          borderRadius="full"
                          w="2"
                          h="2"
                          bg="red.500"
                        ></Box>
                        <Box
                          bg="primary.200"
                          borderRadius="full"
                          h="12"
                          w="12"
                          opacity="0.1"
                        ></Box>
                      </Center>
                    </Pressable>
                  </HStack>
                  <VStack w="100%" justifyContent="center" alignItems="center">
                    <Text
                      color="lightText"
                      opacity={0.4}
                      letterSpacing="lg"
                      fontWeight="medium"
                      fontSize="sm"
                    >
                      Total balance
                    </Text>
                    <Skeleton.Text
                      justifyContent="center"
                      alignItems="center"
                      isLoaded={
                        !initializeDataResult.fetching &&
                        !getAccountByIDResult.fetching
                      }
                      fadeDuration={0.5}
                      startColor="primary.50"
                      endColor="primary.200"
                      opacity={0.1}
                      lines={1}
                      _line={{
                        h: 12,
                        w: 40,
                        mt: 3,
                        mb: 3,
                        borderRadius: "lg",
                      }}
                    >
                      <Text fontSize="4xl" fontWeight="bold" color="lightText">
                        $0
                      </Text>
                    </Skeleton.Text>
                  </VStack>
                </VStack>
              </Container>
            </Center>
          </Box>
          <Box w="100%" bg="primary.600" h="6">
            <Box w="100%" bg="coolGray.50" borderTopRadius="3xl" h="6"></Box>
          </Box>
          <Box w="100%" bg="coolGray.50">
            <Center w="100%">
              <Container w="100%">
                <Center w="100%" mb={4}>
                  <Text>Looks like you're new!</Text>
                </Center>
                <HStack w="100%" justifyContent="space-evenly">
                  <Pressable
                    h="20"
                    px={4}
                    justifyContent="center"
                    alignItems="center"
                    borderWidth={1}
                    borderColor="coolGray.300"
                    borderRadius="lg"
                  >
                    <VStack justifyContent="center" alignItems="center">
                      <Icon
                        as={Ionicons}
                        name="wallet"
                        size="lg"
                        color="darkText"
                      />
                      <Text color="darkText">Create a portfolio</Text>
                    </VStack>
                  </Pressable>
                  <Pressable
                    h="20"
                    px={4}
                    justifyContent="center"
                    alignItems="center"
                    borderWidth={1}
                    borderColor="coolGray.300"
                    borderRadius="lg"
                    onPress={() => {
                      setCreateConnectionModalOpen(true);
                    }}
                  >
                    <CreateConnectionModal
                      open={createConnectionModalOpen}
                      setOpen={setCreateConnectionModalOpen}
                    />
                    <VStack justifyContent="center" alignItems="center">
                      <Icon
                        as={MaterialCommunityIcons}
                        name="connection"
                        size="lg"
                        color="darkText"
                      />
                      <Text color="darkText">Add a connection</Text>
                    </VStack>
                  </Pressable>
                </HStack>
              </Container>
            </Center>
          </Box>
        </Box>
      </ScrollView>
    </>
  );
}
