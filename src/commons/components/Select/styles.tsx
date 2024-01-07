import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderWidth: 2,
    borderColor: "#ff000040",
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  contentWrapper: {
    width: "100%",
    position: "relative",
  },
  selectContent: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    position: "absolute",
    top: 0,
    borderWidth: 1,
    borderColor: "#dddddd",
    overflow: "hidden",
    paddingVertical: 4,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 8,
  },
  ghostInput: {
    width: 0,
    height: 0,
  },
});
