import { Box, StatusBar, Text } from "native-base";
import React from "react";
import { useAppSettingsStore } from "../store/app-settings";

export function SettingsScreen() {
  const colorMode = useAppSettingsStore((state) => state.colorMode);
  return (
    <>
      <StatusBar
        backgroundColor={colorMode === "light" ? "#f9fafb" : "coolGray.800"}
        barStyle={colorMode === "light" ? "dark-content" : "light-content"}
      ></StatusBar>
      <Box>
        <Text>Settings Screen</Text>
      </Box>
    </>
  );
}
