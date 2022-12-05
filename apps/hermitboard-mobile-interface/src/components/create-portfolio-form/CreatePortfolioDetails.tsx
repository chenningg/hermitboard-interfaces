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
  CreatePortfolioInput,
  GetPortfoliosDocument,
} from "../../graphql/generated";
import { useCreatePortfolioFormStore } from "./create-portfolio-store";
import { useMutation, useQuery } from "urql";
import { useAuthStore } from "../../store/auth";
import { CustomToast } from "../CustomToast";
import { redux } from "zustand/middleware";

export function CreatePortfolioDetails(props: {
  setPortfolioFormStage: (
    stage: "portfolioDetails" | "chooseConnections"
  ) => void;
}) {
  const colorMode = useAppSettingsStore((state) => state.colorMode);
  const userID = useAuthStore((state) => state.session?.userID);
  const createPortfolioFormStore = useCreatePortfolioFormStore();

  // Query for user portfolios.
  const [getPortfoliosResult, getPortfolios] = useQuery({
    query: GetPortfoliosDocument,
    variables: {
      userID: userID ?? "",
    },
  });

  // Create portfolio form.
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<CreatePortfolioInput, "name" | "isPublic" | "isVisible">>();

  // Submit handler for portfolio details form.
  const handlePortfolioDetails = handleSubmit((data) => {
    // Update create portfolio store.
    createPortfolioFormStore.setPortfolioDetails(data);

    // Move to next state
    props.setPortfolioFormStage("chooseConnections");
  });

  if (getPortfoliosResult.fetching) {
    return <Text>Fetching portfolios...</Text>;
  }

  if (getPortfoliosResult.error) {
    <Text>{getPortfoliosResult.error.message}</Text>;
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
        <FormControl isRequired isInvalid={"isPublic" in errors}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Checkbox
                onChange={(val) => {
                  onChange(val);
                }}
                value="isPublic"
              >
                Public
              </Checkbox>
            )}
            name="isPublic"
            defaultValue={false}
          />
          <FormControl.ErrorMessage>
            {errors.isPublic?.message}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={"isVisible" in errors}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Checkbox
                onChange={(val) => {
                  onChange(val);
                }}
                value="isVisible"
                defaultIsChecked
              >
                Visible
              </Checkbox>
            )}
            name="isVisible"
            defaultValue={true}
          />
          <FormControl.ErrorMessage>
            {errors.isVisible?.message}
          </FormControl.ErrorMessage>
        </FormControl>

        <HStack w="100%" justifyContent="flex-end">
          <Button borderRadius="lg" onPress={handlePortfolioDetails}>
            Next
          </Button>
        </HStack>
      </VStack>
    </>
  );
}
