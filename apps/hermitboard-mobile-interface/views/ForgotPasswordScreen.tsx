import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Flex,
  FormControl,
  Heading,
  HStack,
  Input,
  KeyboardAvoidingView,
  Link,
  Pressable,
  StatusBar,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Platform } from "react-native";
import { useAppSettingsStore } from "../store/app-settings";
import { NotSignedInRootStackForgotPasswordScreenProps } from "../navigation/types";

type ForgotPasswordFormData = {
  email: string;
};

export function ForgotPasswordScreen({
  route,
  navigation,
}: NotSignedInRootStackForgotPasswordScreenProps) {
  const colorMode = useAppSettingsStore((state) => state.colorMode);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>();

  const onSubmit = handleSubmit((data) => {
    console.log("submiting with ", data);
  });

  return (
    <>
      <StatusBar
        backgroundColor={colorMode === "light" ? "#f9fafb" : "coolGray.900"}
        barStyle={colorMode === "light" ? "dark-content" : "light-content"}
      ></StatusBar>

      <Box
        w="100%"
        h="100%"
        bg={colorMode === "light" ? "coolGray.50" : "coolGray.900"}
      >
        <Center>
          <Container w="100%" h="100%" safeArea>
            <VStack h="100%" w="100%">
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <Flex
                  pt="1/5"
                  mb="1/3"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Heading
                    size="2xl"
                    mb="1"
                    color={colorMode === "light" ? "darkText" : "lightText"}
                  >
                    It's okay.
                  </Heading>
                  <Text
                    color={colorMode === "light" ? "darkText" : "lightText"}
                  >
                    Let's get you back in.
                  </Text>
                </Flex>

                <VStack space={3}>
                  <FormControl isRequired isInvalid={"email" in errors}>
                    <Controller
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          onBlur={onBlur}
                          placeholder="Email"
                          onChangeText={(val) => onChange(val)}
                          w="100%"
                          value={value}
                        />
                      )}
                      name="email"
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^(.+)@(.+)$/,
                          message: "Please enter a valid email",
                        },
                      }}
                      defaultValue=""
                    />
                    <FormControl.ErrorMessage>
                      {errors.email?.message}
                    </FormControl.ErrorMessage>
                  </FormControl>
                  <Link alignSelf="flex-end">Didn't receive an email?</Link>
                </VStack>
              </KeyboardAvoidingView>
              <Button
                position="absolute"
                bottom="10"
                w="100%"
                h="12"
                borderRadius="full"
                bg={colorMode === "light" ? "primary.600" : "primary.800"}
                onPress={onSubmit}
              >
                Send reset email
              </Button>
            </VStack>
          </Container>
        </Center>
      </Box>
    </>
  );
}
