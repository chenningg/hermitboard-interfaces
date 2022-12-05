import {
  Button,
  Checkbox,
  FormControl,
  HStack,
  Input,
  Text,
  useToast,
  VStack,
} from "native-base";
import React, { useEffect } from "react";
import { useAppSettingsStore } from "../../store/app-settings";
import { useForm, Controller } from "react-hook-form";
import {
  CreateConnectionDocument,
  CreateConnectionInput,
  GetPortfoliosDocument,
} from "../../graphql/generated";
import { useCreateConnectionFormStore } from "./create-connection-store";
import { useMutation, useQuery } from "urql";
import { useAuthStore } from "../../store/auth";
import { CustomToast } from "../CustomToast";
import { redux } from "zustand/middleware";

export function CreateConnectionFormConnectionDetails(props: {
  setOpen: (openState: boolean) => void;
  setConnectionFormStage: (stage: "chooseSource" | "connectionDetails") => void;
}) {
  const colorMode = useAppSettingsStore((state) => state.colorMode);
  const userID = useAuthStore((state) => state.session?.userID);
  const createConnectionFormStore = useCreateConnectionFormStore();

  // Query for user portfolios.
  const [getPortfoliosResult, getPortfolios] = useQuery({
    query: GetPortfoliosDocument,
    variables: {
      userID: userID ?? "",
    },
  });

  // Create connection form.
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<
    Pick<
      CreateConnectionInput,
      "accessToken" | "name" | "portfolioIDs" | "refreshToken"
    >
  >();

  // Create connection mutation.
  const [createConnectionResult, createConnection] = useMutation(
    CreateConnectionDocument
  );

  // Toast for displaying creating connection error messages.
  const connectionToast = useToast();

  // Submit handler for connection details form.
  // Handle create connection form submission.
  const handleCreateConnection = handleSubmit((data) => {
    // Update create connection store.
    createConnectionFormStore.setConnectionDetails(data);

    // Get the full state and then submit.
    let createConnectionInput = {
      accessToken: data.accessToken,
      name: data.name,
      portfolioIDs: data.portfolioIDs,
      refreshToken: data.refreshToken,
      sourceID: createConnectionFormStore.sourceID,
    };

    createConnection({ input: createConnectionInput }).then((result) => {
      if (result.error) {
        connectionToast.show({
          render: () => {
            return <CustomToast status="error" title={result.error?.message} />;
          },
          duration: 3000,
          placement: "top",
        });
      }

      // Successful, we can close the modal.
      if (result.data) {
        connectionToast.closeAll();
        connectionToast.show({
          render: () => {
            return (
              <CustomToast
                status="success"
                title={`Connection ${result.data?.createConnection.name} succesfully created!`}
              />
            );
          },
          duration: 3000,
          placement: "top",
        });

        // Reset the state and close modal.
        createConnectionFormStore.reset();
        props.setConnectionFormStage("chooseSource");
        props.setOpen(false);
      }
    });
  });

  if (getPortfoliosResult.fetching) {
    return <Text>Fetching portfolios...</Text>;
  }

  if (getPortfoliosResult.error) {
    return <Text>{getPortfoliosResult.error.message}</Text>;
  }

  return (
    <>
      <VStack space={4} justifyContent="center" alignItems="center">
        <FormControl isRequired isInvalid={"name" in errors}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                placeholder="Name"
                onChangeText={(val) => {
                  onChange(val);
                }}
                w="100%"
                value={value}
              />
            )}
            name="name"
            rules={{
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            }}
            defaultValue=""
          />
          <FormControl.ErrorMessage>
            {errors.name?.message}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={"accessToken" in errors}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                placeholder="Access token"
                onChangeText={(val) => {
                  onChange(val);
                }}
                w="100%"
                value={value}
              />
            )}
            name="accessToken"
            rules={{
              required: "Access token is required",
              minLength: {
                value: 3,
                message: "Access token is too short",
              },
            }}
            defaultValue=""
          />
          <FormControl.ErrorMessage>
            {errors.accessToken?.message}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={"refreshToken" in errors}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                placeholder="Refresh token (optional)"
                onChangeText={(val) => {
                  onChange(val);
                }}
                w="100%"
                value={value ?? undefined}
              />
            )}
            name="refreshToken"
            rules={{
              minLength: {
                value: 3,
                message: "Refresh token is too short",
              },
            }}
            defaultValue=""
          />
          <FormControl.ErrorMessage>
            {errors.refreshToken?.message}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={"portfolioIDs" in errors}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Checkbox.Group
                colorScheme="green"
                defaultValue={[]}
                accessibilityLabel="select your portfolios to add this new connection to"
                onChange={(values) => {
                  onChange(values || []);
                }}
                alignItems="flex-start"
              >
                {getPortfoliosResult.data?.portfolios.edges?.map((edge) => {
                  if (edge?.node) {
                    return (
                      <Checkbox value={edge?.node.id} my="1">
                        {edge?.node.name}
                      </Checkbox>
                    );
                  }
                })}
              </Checkbox.Group>
            )}
            name="portfolioIDs"
            defaultValue={[]}
          />
          <FormControl.ErrorMessage>
            {errors.refreshToken?.message}
          </FormControl.ErrorMessage>
        </FormControl>
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
              props.setConnectionFormStage("chooseSource");
            }}
          >
            Back
          </Button>
          <Button
            borderRadius="lg"
            onPress={handleCreateConnection}
            disabled={createConnectionResult.fetching}
          >
            {createConnectionResult.fetching ? "Creating..." : "Create"}
          </Button>
        </HStack>
      </VStack>
    </>
  );
}
