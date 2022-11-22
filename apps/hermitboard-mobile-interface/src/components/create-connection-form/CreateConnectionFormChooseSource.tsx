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
  VStack,
} from "native-base";
import React from "react";
import { Controller } from "react-hook-form";
import { useQuery } from "urql";
import { GetSourcesDocument } from "../../graphql/generated";
import { useAppSettingsStore } from "../../store/app-settings";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCreateConnectionFormStore } from "./create-connection-store";

export function CreateConnectionFormChooseSource(props: {
  setConnectionFormStage: (stage: "chooseSource" | "connectionDetails") => void;
}) {
  const colorMode = useAppSettingsStore((state) => state.colorMode);
  const createConnectionFormStore = useCreateConnectionFormStore();

  const [getSourcesResult, getSources] = useQuery({
    query: GetSourcesDocument,
  });

  return (
    <>
      <Text fontWeight="bold" mb="3">
        Pick a source
      </Text>
      {getSourcesResult.fetching ? (
        <Spinner size="lg"></Spinner>
      ) : (
        <>
          <VStack w="100%" space={5} alignSelf="center">
            <Input
              placeholder="Find a source"
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
            {getSourcesResult.data ? (
              getSourcesResult.data.sources.edges?.map((value, index) => {
                return (
                  <Pressable
                    onPress={() =>
                      createConnectionFormStore.setSourceID(
                        value?.node?.id ?? ""
                      )
                    }
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="lg"
                    borderColor={
                      createConnectionFormStore.sourceID === value?.node?.id
                        ? "primary.600"
                        : "coolGray.300"
                    }
                    bgColor={
                      createConnectionFormStore.sourceID === value?.node?.id
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
                      bgColor:
                        colorMode === "light" ? "primary.50" : "primary.50",
                    }}
                  >
                    <Text mb="1">{value?.node?.name}</Text>
                    <Image
                      source={{
                        uri: value?.node?.icon ?? "",
                      }}
                      alt="Alternate Text"
                      size="xs"
                    />
                  </Pressable>
                );
              })
            ) : (
              <Text>Error loading sources.</Text>
            )}
          </ScrollView>
          <Button
            onPress={() => {
              props.setConnectionFormStage("connectionDetails");
            }}
          >
            Next
          </Button>
        </>
      )}
    </>
  );
}
