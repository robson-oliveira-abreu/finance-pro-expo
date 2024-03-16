import { ViewProps } from "react-native";
import { Button } from "react-native-paper";

type ButtonMode =
  | "text"
  | "outlined"
  | "contained"
  | "elevated"
  | "contained-tonal"
  | undefined;

type ButtonViewProps = {
  onPress: () => void;
  mode?: ButtonMode;
  textColor?: string;
} & ViewProps;

export function ButtonView(props: ButtonViewProps) {
  const { onPress, mode, textColor, ...rest } = props;

  return (
    <Button onPress={onPress} mode={mode} textColor={textColor} {...rest}>
      {props.children}
    </Button>
  );
}
