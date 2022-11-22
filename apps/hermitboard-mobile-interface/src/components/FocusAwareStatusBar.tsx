import * as React from "react";
import { StatusBar } from "react-native";
import { useIsFocused } from "@react-navigation/native";

export function FocusAwareStatusBar(props: {
  bgColor: string;
  barStyle: "dark-content" | "light-content";
}) {
  const isFocused = useIsFocused();

  return isFocused ? (
    <StatusBar
      backgroundColor={props.bgColor}
      barStyle={props.barStyle}
    ></StatusBar>
  ) : null;
}
