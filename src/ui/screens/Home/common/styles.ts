import { StyleSheet } from "react-native";
import { theme } from "@infra/theme/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 12,
    minHeight: "100%",
    backgroundColor: theme.colors.background,
  },
  input: {
    width: "100%",
  },
  button: {
    width: "100%",
    borderRadius: 8,
  },
});
