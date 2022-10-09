import { Box, Text } from "native-base";
import React from "react";
import { SignedInRootTabHomeScreenProps } from "../navigation/types";

export function HomeScreen({
  route,
  navigation,
}: SignedInRootTabHomeScreenProps) {
  return (
    <Box>
      <Text>Home Screen</Text>
    </Box>
  );
}
