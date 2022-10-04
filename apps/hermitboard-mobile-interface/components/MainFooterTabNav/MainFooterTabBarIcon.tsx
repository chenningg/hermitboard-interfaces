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
      name={
        props.focused === false ? props.iconName : props.iconFocusedName
      }></Icon>
  );
}
