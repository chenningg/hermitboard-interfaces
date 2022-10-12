import { FormControl, Input, Text } from "native-base";
import React from "react";
import { Controller } from "react-hook-form";
import { useAppSettingsStore } from "../../store/app-settings";

export function CreateConnectionFormChooseSource() {
  const colorMode = useAppSettingsStore((state) => state.colorMode);

  return <Text>HEy</Text>;
}
