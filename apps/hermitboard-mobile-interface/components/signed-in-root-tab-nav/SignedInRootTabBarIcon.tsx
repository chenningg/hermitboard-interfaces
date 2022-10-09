import { Icon } from "native-base";
import { ThemeComponentSizeType } from "native-base/lib/typescript/components/types";
import React from "react";
import { useAppSettingsStore } from "../../store/app-settings";

export function SignedInRootTabBarIcon({
  size,
  focused,
  iconLibrary,
  activeIconName,
  inactiveIconName,
}: {
  size: ThemeComponentSizeType<"Icon">;
  focused: boolean;
  iconLibrary: any;
  activeIconName: string;
  inactiveIconName: string;
}) {
  const colorMode = useAppSettingsStore((state) => state.colorMode);

  return (
    <Icon
      as={iconLibrary}
      size={size}
      name={focused ? activeIconName : inactiveIconName}
      color={
        focused
          ? colorMode === "light" // Focused
            ? "primary.700"
            : "primary.200"
          : colorMode === "light" // Unfocused
          ? "coolGray.800"
          : "coolGray.100"
      }
    ></Icon>
  );
}
