import { Box, Text, Alert, HStack, Icon } from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

export function CustomToast(props: {
  status: "warning" | "error" | "success" | "info";
  title?: string;
}) {
  let bgColor: ColorType =
    props.status === "warning"
      ? "warning.500"
      : props.status === "error"
      ? "error.500"
      : props.status === "success"
      ? "success.500"
      : "info.500"; // Default is info.

  let toastIcon =
    props.status === "warning" ? (
      <Icon as={Ionicons} name="ios-warning" size={4} color="lightText" />
    ) : props.status === "error" ? (
      <Icon as={Ionicons} name="close-circle" size={4} color="lightText" />
    ) : props.status === "success" ? (
      <Icon as={Ionicons} name="checkmark-circle" size={4} color="lightText" />
    ) : (
      <Icon
        as={Ionicons}
        name="ios-information-circle"
        size={4}
        color="lightText"
      />
    ); // Default is info.

  return (
    <Box
      bg={bgColor}
      w="100%"
      px={3}
      py={2}
      borderRadius="lg"
      overflow="hidden"
    >
      <HStack alignItems="center" justifyContent="center" space={1}>
        {toastIcon}
        <Text color="lightText">{props.title ?? props.status}</Text>
      </HStack>
    </Box>
  );
}
