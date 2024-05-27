import { useTheme } from "@application/Hooks/useTheme";
import { Text, TextProps } from "react-native";
import { PropsWithChildren } from "react";

type LabelProps = {
  style?: TextProps["style"];
} & PropsWithChildren;

export function Label({ style, children }: LabelProps) {
  const theme = useTheme();

  return (
    <Text
      className={`pl-2 text-xs mb-1  ${theme.isDark(
        "text-dark-textSecondary",
        "text-textSecondary"
      )}`}
      style={[style]}
    >
      {children}
    </Text>
  );
}
