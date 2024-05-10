import { StyleSheet, Platform } from "react-native";
import { theme } from "../../../theme/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: "100%",
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? 20 : 4,
    marginBottom: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  footer: {
    padding: 20,
    gap: 8,
  },
  bold: {
    fontWeight: "700",
  },
});
