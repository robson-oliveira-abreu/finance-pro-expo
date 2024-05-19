import { StyleSheet } from "react-native";
import { isIos, isWeb } from "src/application/utils/platform";
import { theme } from "@infra/theme/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: isWeb ? ("100dvh" as any) : "100%",
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
    backgroundColor: theme.colors.main,
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
