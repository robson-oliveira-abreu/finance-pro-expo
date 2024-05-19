import { theme } from "@infra/theme/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
  },
  content: {
    gap: 12,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "100%",
    borderRadius: 8,
  },
});
