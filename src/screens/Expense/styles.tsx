import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  footer: {
    padding: 20,
    gap: 8,
  },
});
