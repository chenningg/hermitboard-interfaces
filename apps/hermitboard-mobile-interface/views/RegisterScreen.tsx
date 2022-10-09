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
import { NotSignedInRootStackRegisterScreenProps } from "../navigation/types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type RegisterFormData = {
  email: string;
  nickname: string;
  password: string;
};

export function RegisterScreen({
  route,
  navigation,
}: NotSignedInRootStackRegisterScreenProps) {
  // Color mode and greeting message.
  const colorMode = useAppSettingsStore((state) => state.colorMode);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

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
              <KeyboardAwareScrollView
                enableOnAndroid={true}
                extraHeight={40}
                extraScrollHeight={40}
                showsVerticalScrollIndicator={false}
              >
                <Flex
                  pt="1/5"
                  mb="1/4"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Heading
                    size="2xl"
                    mb="1"
                    color={colorMode === "light" ? "darkText" : "lightText"}
                  >
                    Sign up
                  </Heading>
                  <Text
                    color={colorMode === "light" ? "darkText" : "lightText"}
                  >
                    Manage all your money in one place.
                  </Text>
                </Flex>

                <VStack space={5}>
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
                  <FormControl isRequired isInvalid={"nickname" in errors}>
                    <Controller
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          onBlur={onBlur}
                          placeholder="Nickname"
                          onChangeText={(val) => onChange(val)}
                          w="100%"
                          value={value}
                        />
                      )}
                      name="nickname"
                      rules={{
                        required: "Nickname is required",
                        minLength: {
                          value: 3,
                          message: "Nickname must be at least 3 characters",
                        },
                      }}
                      defaultValue=""
                    />
                    <FormControl.ErrorMessage>
                      {errors.nickname?.message}
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
                  </VStack>
                </VStack>
              </KeyboardAwareScrollView>
              <Button
                position="absolute"
                bottom="10"
                w="100%"
                h="12"
                borderRadius="full"
                bg={colorMode === "light" ? "primary.600" : "primary.800"}
                onPress={onSubmit}
              >
                Sign up
              </Button>
            </VStack>
          </Container>
        </Center>
      </Box>
    </>
  );
}
