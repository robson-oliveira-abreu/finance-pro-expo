import { ViewStyle } from "react-native";

const baseBadgeStyle: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 4,
  borderRadius: 8,
};

export const badgeStatus = {
  paid: {
    style: {
      backgroundColor: "#40f140",
      ...baseBadgeStyle,
    },
    text: "pago",
  },
  unpaid: {
    style: {
      backgroundColor: "#f1c140",
      ...baseBadgeStyle,
    },
    text: "pagar",
  },
  overdue: {
    style: {
      backgroundColor: "#f14040",
      ...baseBadgeStyle,
    },
    text: "vencido",
  },
};
