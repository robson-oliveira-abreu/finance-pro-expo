import { StyleSheet } from "react-native";
import { isIos } from "../../commons/utils/platform";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    alignSelf: "flex-start",
    paddingHorizontal: 24,
    paddingVertical: 12,
    paddingTop: isIos ? 24 : 12,
  },
});
