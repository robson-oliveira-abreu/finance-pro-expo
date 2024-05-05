import { StyleSheet, TouchableOpacity, ViewProps } from "react-native";
import { Text } from "../Text";
import { theme } from "../../../theme/theme";

type ButtonMode = "text" | "outlined" | "contained";

type ButtonViewProps = {
  onPress: () => void;
  variant?: ButtonMode;
  color?: string;
} & ViewProps;

const containerStyle = (variant: ButtonMode) => `container_${variant}`;
const textStyle = (variant: ButtonMode) => `text_${variant}`;

export function ButtonView(props: ButtonViewProps) {
  const { onPress, variant = "contained", color, style, ...rest } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        containerStyles.container,
        containerStyles[containerStyle(variant)],
        style,
      ]}
      {...rest}
    >
      <Text
        color={color}
        style={[tesxtStyles.text, tesxtStyles[textStyle(variant)]]}
      >
        {props.children}
      </Text>
    </TouchableOpacity>
  );
}

const containerStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignContent: "center",
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.main,
  },
  container_text: {
    borderColor: "transparent",
  },
  container_outlined: {
    borderWidth: 2,
    borderColor: theme.colors.shapeDark,
  },
  container_contained: {
    backgroundColor: theme.colors.main,
  },
});

const tesxtStyles = StyleSheet.create({
  text: {
    textAlign: "center",
  },
  text_text: {},
  text_outlined: {},
  text_contained: {
    color: theme.colors.background,
  },
});
