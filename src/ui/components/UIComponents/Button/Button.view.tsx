import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ViewProps,
} from "react-native";
import { Text } from "../Text";
import { theme } from "../../../theme/theme";

type ButtonMode = "text" | "outlined" | "contained";

type ButtonViewProps = {
  onPress: () => void;
  variant?: ButtonMode;
  color?: string;
  loading?: boolean;
  disabled?: boolean;
} & ViewProps;

const containerStyle = (variant: ButtonMode) => `container_${variant}`;
const textStyle = (variant: ButtonMode) => `text_${variant}`;

export function ButtonView(props: ButtonViewProps) {
  const {
    onPress,
    variant = "contained",
    color,
    loading = false,
    disabled = false,
    style,
    ...rest
  } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        containerStyles.container,
        containerStyles[containerStyle(variant)],
        disabled && containerStyles.disabled,
        style,
      ]}
      {...rest}
      disabled={disabled}
    >
      <Text
        color={color}
        style={[tesxtStyles.text, tesxtStyles[textStyle(variant)]]}
      >
        {loading ? (
          <ActivityIndicator
            color={tesxtStyles[textStyle(variant)]?.color}
            size={"small"}
          />
        ) : (
          props.children
        )}
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
  disabled: {
    opacity: 0.5,
  },
});

const tesxtStyles = StyleSheet.create({
  text: {
    textAlign: "center",
  },
  text_text: {
    color: theme.colors.main,
  },
  text_outlined: {
    color: theme.colors.main,
  },
  text_contained: {
    color: theme.colors.background,
  },
});
