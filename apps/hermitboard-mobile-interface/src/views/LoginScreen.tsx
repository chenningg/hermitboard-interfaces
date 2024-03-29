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
  useToast,
} from "native-base";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { NotSignedInRootStackLoginScreenProps } from "../navigation/types";
import { useAppSettingsStore } from "../store/app-settings";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useMutation } from "urql";
import { LoginToAccountDocument } from "../graphql/generated/index";
import { useAuthStore } from "../store/auth";
import { CustomToast } from "../components/CustomToast";

type LoginFormData = {
  username: string;
  password: string;
};

export function LoginScreen({
  route,
  navigation,
}: NotSignedInRootStackLoginScreenProps) {
  const colorMode = useAppSettingsStore((state) => state.colorMode);
  const setAuthState = useAuthStore((state) => state.setAuthState);

  // Login form.
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  // Login mutation.
  const [loginToAccountResult, loginToAccount] = useMutation(
    LoginToAccountDocument
  );

  // Toast for displaying login error messages.
  const loginToast = useToast();

  // Submit handler for login form.
  const handleLogin = handleSubmit((data) => {
    loginToAccount({
      input: {
        username: data.username,
        password: data.password,
      },
    }).then((result) => {
      if (result.error) {
        loginToast.show({
          render: () => {
            return (
              <CustomToast
                status="error"
                title={
                  result.error?.networkError
                    ? result.error?.networkError?.message
                    : result.error?.graphQLErrors[0].message
                }
              />
            );
          },
          duration: 3000,
          placement: "top",
        });
      }

      // If we get back data, then populate the auth and user stores with it.
      if (result.data) {
        setAuthState(result.data?.loginToAccount.session);
      }
    });
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
          <Container w="100%" h="100%" safeArea>
            <VStack h="100%" w="100%">
              <KeyboardAwareScrollView
                enableOnAndroid={true}
                extraHeight={40}
                extraScrollHeight={40}
                showsVerticalScrollIndicator={false}
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
                    Hermitboard
                  </Heading>
                  <Text
                    color={colorMode === "light" ? "darkText" : "lightText"}
                  >
                    Money simplified.
                  </Text>
                </Flex>

                <VStack space={5}>
                  <FormControl isRequired isInvalid={"username" in errors}>
                    <Controller
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          onBlur={onBlur}
                          placeholder="Email/Nickname"
                          onChangeText={(val) => onChange(val)}
                          w="100%"
                          value={value}
                        />
                      )}
                      name="username"
                      rules={{
                        required: "Email/Nickname is required",
                        minLength: {
                          value: 3,
                          message:
                            "Email/Nickname must be at least 3 characters",
                        },
                      }}
                      defaultValue=""
                    />
                    <FormControl.ErrorMessage>
                      {errors.username?.message}
                    </FormControl.ErrorMessage>
                  </FormControl>
                  <VStack>
                    <FormControl
                      mb="3"
                      isRequired
                      isInvalid={"password" in errors}
                    >
                      <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            type="password"
                            onBlur={onBlur}
                            placeholder="Password"
                            onChangeText={(val) => onChange(val)}
                            w="100%"
                            value={value}
                          />
                        )}
                        name="password"
                        rules={{
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                          },
                        }}
                        defaultValue=""
                      />
                      <FormControl.ErrorMessage>
                        {errors.password?.message}
                      </FormControl.ErrorMessage>
                    </FormControl>
                    <Link
                      alignSelf="flex-end"
                      onPress={() => {
                        navigation.navigate("ForgotPassword");
                      }}
                    >
                      Forgot password?
                    </Link>
                  </VStack>
                </VStack>
              </KeyboardAwareScrollView>
              <VStack w="100%" position="absolute" bottom="10">
                <HStack mb="6" justifyContent="center">
                  <Text mr="1">Don't have an account?</Text>
                  <Link
                    onPress={() => {
                      navigation.navigate("Register");
                    }}
                  >
                    Sign up.
                  </Link>
                </HStack>
                <Button
                  w="100%"
                  h="12"
                  isLoading={loginToAccountResult.fetching}
                  isLoadingText="Logging in"
                  disabled={loginToAccountResult.fetching}
                  spinnerPlacement="start"
                  borderRadius="lg"
                  bg={colorMode === "light" ? "primary.600" : "primary.800"}
                  _pressed={{
                    bg: colorMode === "light" ? "primary.700" : "primary.800",
                  }}
                  onPress={handleLogin}
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
