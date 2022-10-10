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
  alignMargin,
}: {
  size: ThemeComponentSizeType<"Icon">;
  focused: boolean;
  iconLibrary: any;
  activeIconName: string;
  inactiveIconName: string;
  alignMargin?: number;
}) {
  const colorMode = useAppSettingsStore((state) => state.colorMode);

  return (
    <Icon
      as={iconLibrary}
      size={size}
      name={focused ? activeIconName : inactiveIconName}
      mr={alignMargin ?? 0}
      color={
        focused
          ? colorMode === "light" // Focused
            ? "primary.700"
            : "primary.200"
          : colorMode === "light" // Unfocused
          ? "muted.400"
          : "muted.400"
      }
    ></Icon>
  );
}
