import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  useToast,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { useMutation, useQuery } from "urql";
import {
  CreatePortfolioDocument,
  GetConnectionsDocument,
  Scalars,
} from "../../graphql/generated";
import { useAppSettingsStore } from "../../store/app-settings";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCreatePortfolioFormStore } from "./create-portfolio-store";
import { CustomToast } from "../CustomToast";
import { useAuthStore } from "../../store/auth";

export function CreatePortfolioConnections(props: {
  setOpen: (openState: boolean) => void;
  setPortfolioFormStage: (
    stage: "portfolioDetails" | "chooseConnections"
  ) => void;
}) {
  const colorMode = useAppSettingsStore((state) => state.colorMode);
  const userID = useAuthStore((state) => state.session?.userID);
  const createPortfolioFormStore = useCreatePortfolioFormStore();

  const [getConnectionsResult, getConnections] = useQuery({
    query: GetConnectionsDocument,
    variables: {
      userID: userID ?? "",
    },
  });

  // Connections to be added to the portfolio.
  const [connectionsToAdd, setConnectionsToAdd] = useState<{
    [key: Scalars["ID"]]: boolean;
  }>({});

  const handleConnectionChange = (
    connectionID: Scalars["ID"],
    action: "remove" | "add"
  ) => {
    console.log(connectionID, action);
    if (action === "add") {
      setConnectionsToAdd((curr) => {
        curr[connectionID] = true;
        return curr;
      });
    } else {
      setConnectionsToAdd((curr) => {
        delete curr[connectionID];
        return curr;
      });
    }
  };

  // Create portfolio mutation.
  const [createPortfolioResult, createPortfolio] = useMutation(
    CreatePortfolioDocument
  );

  // Toast for displaying creating portfolio error messages.
  const portfolioToast = useToast();

  // Submit handler for portfolio.
  // Handle create connection form submission.
  const handleCreatePortfolio = () => {
    // Update create portfolio store.
    createPortfolioFormStore.setConnectionIDs(
      Object.keys(connectionsToAdd).length > 0
        ? Object.keys(connectionsToAdd)
        : []
    );

    // Get the full state and then submit.
    let createPortfolioInput = {
      name: createPortfolioFormStore.name,
      isPublic: createPortfolioFormStore.isPublic ?? false,
      isVisible: createPortfolioFormStore.isVisible ?? true,
      connectionIDs:
        Object.keys(connectionsToAdd).length > 0
          ? Object.keys(connectionsToAdd)
          : [],
    };

    createPortfolio({ input: createPortfolioInput }).then((result) => {
      if (result.error) {
        portfolioToast.show({
          render: () => {
            return <CustomToast status="error" title={result.error?.message} />;
          },
          duration: 3000,
          placement: "top",
        });
      }

      // Successful, we can close the modal.
      if (result.data) {
        portfolioToast.closeAll();
        portfolioToast.show({
          render: () => {
            return (
              <CustomToast
                status="success"
                title={`Portfolio ${result.data?.createPortfolio.name} succesfully created!`}
              />
            );
          },
          duration: 3000,
          placement: "top",
        });

        // Reset the state and close modal.
        createPortfolioFormStore.reset();
        props.setPortfolioFormStage("portfolioDetails");
        props.setOpen(false);
      }
    });
  };

  return (
    <>
      <Text fontWeight="bold" mb="3">
        Add connections to portfolio
      </Text>
      {getConnectionsResult.fetching ? (
        <Spinner size="lg"></Spinner>
      ) : getConnectionsResult.data?.connections.edges?.length === 0 ? (
        <>
          <Text>No connections found!</Text>
        </>
      ) : (
        <>
          <VStack w="100%" space={5} alignSelf="center">
            <Input
              placeholder="Find a connection"
              variant="filled"
              backgroundColor="muted.100"
              width="100%"
              borderRadius="md"
              borderWidth={1}
              borderColor="muted.200"
              py="1"
              px="2"
              mb="4"
              h="12"
              InputLeftElement={
                <Icon
                  ml="2"
                  size="4"
                  color="gray.400"
                  as={<Ionicons name="ios-search" />}
                />
              }
            />
          </VStack>
          <ScrollView mb="3" maxHeight="72">
            {getConnectionsResult.data ? (
              getConnectionsResult.data.connections.edges?.map(
                (value, index) => {
                  return (
                    <Pressable
                      onPress={() => {
                        handleConnectionChange(
                          value?.node?.id ?? "",
                          connectionsToAdd[value?.node?.id ?? ""] === true
                            ? "remove"
                            : "add"
                        );
                      }}
                      justifyContent="center"
                      alignItems="center"
                      borderRadius="lg"
                      borderColor={
                        value?.node?.id ?? "" in connectionsToAdd
                          ? "primary.600"
                          : "coolGray.300"
                      }
                      bgColor={
                        value?.node?.id ?? "" in connectionsToAdd
                          ? colorMode === "light"
                            ? "primary.50"
                            : null
                          : null
                      }
                      borderWidth="1"
                      mb="3"
                      px="3"
                      py="2"
                      key={index}
                      _pressed={{
                        borderColor:
                          colorMode === "light" ? "primary.600" : "primary.50",
                        bgColor:
                          colorMode === "light" ? "primary.50" : "primary.50",
                      }}
                    >
                      <Text mb="1">{value?.node?.name}</Text>
                      <Image
                        source={{
                          uri: value?.node?.source.icon ?? "",
                        }}
                        alt="Alternate Text"
                        width={20}
                        height={8}
                        resizeMode="contain"
                      />
                    </Pressable>
                  );
                }
              )
            ) : (
              <Text>Error loading connections.</Text>
            )}
          </ScrollView>

          <HStack w="100%" justifyContent="flex-end" space={4}>
            <Button
              variant="outline"
              borderColor="coolGray.600"
              borderRadius="lg"
              _text={{
                color: "coolGray.600",
              }}
              _pressed={{
                bgColor: "gray.200",
              }}
              onPress={() => {
                props.setPortfolioFormStage("portfolioDetails");
              }}
            >
              Back
            </Button>
            <Button
              borderRadius="lg"
              onPress={handleCreatePortfolio}
              disabled={createPortfolioResult.fetching}
            >
              {createPortfolioResult.fetching ? "Creating..." : "Create"}
            </Button>
          </HStack>
        </>
      )}
    </>
  );
}
