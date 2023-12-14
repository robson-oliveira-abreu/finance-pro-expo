import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  list: {
    width,
    paddingHorizontal: 20,
    paddingBottom: 12,
    marginTop: 8,
    paddingTop: 4,
  },
});
