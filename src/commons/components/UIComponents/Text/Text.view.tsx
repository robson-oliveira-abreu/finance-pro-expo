import { StyleSheet, Text } from "react-native";
import { TextViewProps } from "./types";

export function TextView(props: TextViewProps) {
  const { children, variant = "bodyMedium", style, color, ...rest } = props;

  return (
    <Text style={[styles[variant], color ? { color } : null, style]} {...rest}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  bodySmall: {
    fontSize: 12,
    fontWeight: "400",
  },
  bodyMedium: {
    fontSize: 16,
    fontWeight: "400",
  },
  bodyLarge: {
    fontSize: 20,
    fontWeight: "400",
  },
  titleSmall: {
    fontSize: 12,
    fontWeight: "700",
  },
  titleMedium: {
    fontSize: 16,
    fontWeight: "700",
  },
  titleLarge: {
    fontSize: 20,
    fontWeight: "700",
  },
  displaySmall: {
    fontSize: 16,
    fontWeight: "400",
  },
  displayMedium: {
    fontSize: 20,
    fontWeight: "400",
  },
  displayLarge: {
    fontSize: 24,
    fontWeight: "400",
  },
  headlineSmall: {
    fontSize: 20,
    fontWeight: "700",
  },
  headlineMedium: {
    fontSize: 24,
    fontWeight: "700",
  },
  headlineLarge: {
    fontSize: 28,
    fontWeight: "700",
  },
});
