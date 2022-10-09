import { StackHeaderProps } from "@react-navigation/stack";
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

export function StackHeader({
  visible,
  navigation,
  tintColor,
  bgColor,
  direction = "back",
}: StackHeaderProps & {
  visible: boolean;
  tintColor?: { light: ColorType; dark: ColorType };
  bgColor: { light: ColorType; dark: ColorType };
  direction?: "back" | "top";
}) {
  const colorMode = useAppSettingsStore((state) => state.colorMode);
  return visible ? (
    <HStack
      alignItems="center"
      bg={colorMode === "light" ? bgColor.light : bgColor.dark}
      w="100%"
      h="16"
    >
      <IconButton
        icon={
          direction === "back" ? (
            <Icon as={Entypo} name="chevron-left" />
          ) : (
            <Icon as={Entypo} name="cross" />
          )
        }
        _icon={{
          size: "3xl",
          color: tintColor
            ? colorMode === "light"
              ? tintColor.light
              : tintColor.dark
            : colorMode === "light"
            ? "coolGray.900"
            : "coolGray.100",
        }}
        _pressed={{ bg: "transparent" }}
        onPress={direction === "back" ? navigation.goBack : navigation.popToTop}
      />
    </HStack>
  ) : (
    <Box
      bg={colorMode === "light" ? bgColor.light : bgColor.dark}
      w="100%"
      h="16"
    ></Box>
  );
}
