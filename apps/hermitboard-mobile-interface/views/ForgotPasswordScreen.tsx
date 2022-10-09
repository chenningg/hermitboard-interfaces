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
  // Color mode and greeting message.
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
        backgroundColor={colorMode === "light" ? "#f3f4f6" : "#111827"}
        barStyle={colorMode === "light" ? "dark-content" : "light-content"}
      ></StatusBar>

      <Box
        w="100%"
        h="100%"
        bg={colorMode === "light" ? "coolGray.100" : "coolGray.900"}
      >
        <Center>
          <Container w="100%" h="100%" safeArea>
            <VStack h="100%" w="100%">
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <Flex pt="20" justifyContent="center" alignItems="center">
                  <Heading
                    size="2xl"
                    mb="1"
                    color={colorMode === "light" ? "darkText" : "lightText"}
                  >
                    Hermitboard
                  </Heading>
                  <Text
                    mb="16"
                    color={colorMode === "light" ? "darkText" : "lightText"}
                  >
                    Money simplified.
                  </Text>
                </Flex>

                <VStack space={5}>
                  <FormControl isRequired isInvalid={"username" in errors}>
                    <Input placeholder="Email/Nickname" w="100%" />
                  </FormControl>
                  <VStack>
                    <FormControl
                      mb="3"
                      isRequired
                      isInvalid={"password" in errors}
                    >
                      <Input placeholder="Password" w="100%" />
                    </FormControl>
                    <Link alignSelf="flex-end">Forgot password?</Link>
                  </VStack>
                </VStack>
              </KeyboardAvoidingView>
              <VStack w="100%" position="absolute" bottom="10">
                <HStack mb="6" justifyContent="center">
                  <Text mr="1">Don't have an account?</Text>
                  <Link>Sign up.</Link>
                </HStack>
                <Button
                  w="100%"
                  h="12"
                  borderRadius="full"
                  bg={colorMode === "light" ? "primary.600" : "primary.800"}
                >
                  Log in
                </Button>
              </VStack>
            </VStack>
          </Container>
        </Center>
      </Box>
    </>
  );
}
