import { StyleSheet } from "react-native";
import { isIos, isWeb } from "@infra/utils/platform";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: isIos || isWeb ? 20 : 0,
    paddingHorizontal: 20,
  },
  title: {
    textAlign: "center",
    marginBottom: 0,
  },
});
