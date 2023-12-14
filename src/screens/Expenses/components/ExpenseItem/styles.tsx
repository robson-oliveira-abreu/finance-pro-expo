import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "600",
  },
  amount: {
    fontWeight: "600",
  },
  amount_paid: {
    color: "#00ff00",
  },
  amount_unpaid: {
    color: "#ff0000",
  },
});
