import { StyleProp, ViewStyle } from "react-native";

export type SelectProps = {
  style?: StyleProp<ViewStyle>;
  selected: string;
  onSelect: (selected: string) => void;
};
