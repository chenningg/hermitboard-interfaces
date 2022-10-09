import { Text } from "native-base";
import React from "react";

export function SignedInRootTabBarLabel(props: {
  focused: boolean;
  label: string;
  hide?: boolean;
}) {
  // Hide the label. Else, by default show it.
  if (props.hide !== undefined && props.hide) {
    return <></>;
  }

  return (
    <Text color={props.focused ? "green.300" : "green.700"}>{props.label}</Text>
  );
}