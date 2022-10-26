import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Image,
  Input,
  Pressable,
  ScrollView,
  Spinner,
  Text,
} from "native-base";
import React from "react";
import { Controller } from "react-hook-form";
import { useQuery } from "urql";
import { GetSourcesDocument } from "../../graphql/generated";
import { useAppSettingsStore } from "../../store/app-settings";

export function CreateConnectionFormChooseSource(props: {
  setConnectionFormStage: (stage: "chooseSource" | "connectionDetails") => void;
}) {
  const colorMode = useAppSettingsStore((state) => state.colorMode);

  const [getSourcesResult, getSources] = useQuery({
    query: GetSourcesDocument,
  });

  return (
    <>
      <Text fontWeight="bold" mb="4">
        Pick a source
      </Text>
      {getSourcesResult.fetching ? (
        <Spinner size="lg"></Spinner>
      ) : (
        <ScrollView mb="7">
          <HStack>
            {getSourcesResult.data ? (
              getSourcesResult.data.sources.edges?.map((value, index) => {
                return (
                  <Pressable
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="lg"
                    borderColor="coolGray.300"
                    borderWidth="1"
                    px="3"
                    py="2"
                    key={index}
                    _pressed={{
                      bgColor:
                        colorMode === "light" ? "coolGray.200" : "coolGray.200",
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
          </HStack>
        </ScrollView>
      )}
      <Button
        onPress={() => {
          props.setConnectionFormStage("connectionDetails");
        }}
      >
        Next
      </Button>
    </>
  );
}
