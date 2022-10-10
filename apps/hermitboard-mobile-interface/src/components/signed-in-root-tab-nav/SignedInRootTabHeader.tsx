import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import {
  Box,
  Container,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
} from "native-base";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useAppSettingsStore } from "../../store/app-settings";
import { ColorType } from "native-base/lib/typescript/components/types";

export function SignedInRootTabHeader({
  navigation,
  visible,
  tintColor,
  bgColor,
}: {
  navigation: BottomTabHeaderProps["navigation"];
  visible: boolean;
  tintColor: { light: ColorType; dark: ColorType };
  bgColor: { light: ColorType; dark: ColorType };
}) {
  const colorMode = useAppSettingsStore((state) => state.colorMode);
  const canGoBack = navigation.canGoBack();
  return visible ? (
    <HStack
      alignItems="center"
      justifyContent="space-between"
      bg={colorMode === "light" ? bgColor.light : bgColor.dark}
      w="100%"
      h="16"
    >
      {canGoBack ? (
        <IconButton
          icon={<Icon as={Entypo} name="chevron-left" />}
          _icon={{
            size: "3xl",
            color: colorMode === "light" ? tintColor.light : tintColor.dark,
          }}
          _pressed={{ bg: "transparent" }}
          onPress={navigation.goBack}
        />
      ) : null}
    </HStack>
  ) : (
    <Box
      bg={colorMode === "light" ? bgColor.light : bgColor.dark}
      w="100%"
      h="16"
    ></Box>
  );
}
