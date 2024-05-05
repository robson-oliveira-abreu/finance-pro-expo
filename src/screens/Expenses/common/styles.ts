import { StyleSheet } from "react-native";
import { isIos, isWeb } from "../../../commons/utils/platform";
import { theme } from "../../../commons/theme/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
  },
  title: {
    alignSelf: "flex-start",
    paddingHorizontal: 24,
    paddingVertical: 12,
    paddingTop: isIos ? 24 : 12,
  },
  addButtonWrapper: {
    backgroundColor: "red",
    borderRadius: 16,
    position: "absolute",
    bottom: 20,
    right: 20,
    overflow: "hidden",
  },
  addButton: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  selectMonth: {
    paddingHorizontal: 20,
    marginVertical: 8,
    marginBottom: isWeb ? 12 : 0,
  },
});
