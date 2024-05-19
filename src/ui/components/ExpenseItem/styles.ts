import { theme } from "@infra/theme/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  title: {
    fontWeight: "600",
  },
  amount: {
    fontWeight: "600",
    textAlign: "right",
  },
  amount_paid: {
    color: "#00ff00",
  },
  amount_unpaid: {
    color: "#ff0000",
  },
  badge_paid: {},
  badge_unpaid: {},
  badge: {},
});
