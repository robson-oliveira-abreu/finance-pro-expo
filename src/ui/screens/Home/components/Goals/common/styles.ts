import { Dimensions, StyleSheet } from "react-native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const MAX_WIDTH = WIDTH / 3 - 12 > HEIGHT * 0.3 ? HEIGHT * 0.3 : WIDTH / 3 - 12;

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingBottom: 30,
  },
  itemContainer: {
    width: "33%",
    maxWidth: MAX_WIDTH,
    maxHeight: MAX_WIDTH,
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
