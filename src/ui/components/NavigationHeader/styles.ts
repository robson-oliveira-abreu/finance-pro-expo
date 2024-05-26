import { StyleSheet } from "react-native";
import { isIos, isWeb } from "@application/utils/platform";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: isWeb ? 20 : 0,
  },
  title: {
    textAlign: "center",
    marginBottom: 0,
  },
});
