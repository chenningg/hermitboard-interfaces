import { Icon } from "native-base";

export function MainFooterTabBarIcon(props: {
  focused: boolean;
  iconLibrary: any;
  iconName: string;
  iconFocusedName: string;
}) {
  return (
    <Icon
      as={props.iconLibrary}
      name={props.focused ? props.iconFocusedName : props.iconName}
      color={props.focused ? "blue.700" : "blue.300"}></Icon>
  );
}
