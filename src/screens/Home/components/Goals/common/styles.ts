import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  itemContainer: {
    flexGrow: 1,
    maxWidth: width / 3 - 24,
    gap: 4,
  },
  itemContent: {
    padding: 12,
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: "#101010",
    alignItems: "center",
    justifyContent: "center",
  },
  itemTitle: {
    alignSelf: "center",
  },
  text: {
    color: "#FFFFFF",
  },
});
