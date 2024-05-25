import { Dimensions, StyleSheet } from "react-native";
import { theme } from "@infra/theme/theme";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  title: {
    width: "100%",
    textAlign: "left",
    paddingHorizontal: 24,
    paddingTop: 4,
    paddingBottom: 8,
    color: "#444",
  },
  list: {
    paddingTop: 4,
  },
});
