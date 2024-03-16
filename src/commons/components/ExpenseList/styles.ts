import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  title: {
    width: "100%",
    textAlign: "left",
    paddingLeft: 28,
    paddingTop: 4,
  },
  list: {
    width,
    paddingHorizontal: 20,
    paddingBottom: 12,
    paddingTop: 4,
  },
});
