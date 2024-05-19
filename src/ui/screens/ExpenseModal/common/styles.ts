import { theme } from "@infra/theme/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    backgroundColor: theme.colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
    padding: 20,
    marginBottom: 20,
    gap: 12,
  },
  flexOne: {
    flex: 1,
  },
  rowInputs: {
    flexDirection: "row",
    width: "100%",
    gap: 6,
  },
});
