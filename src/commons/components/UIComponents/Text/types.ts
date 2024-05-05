import { TextProps } from "react-native";

type TextVariant =
  | "bodySmall"
  | "bodyMedium"
  | "bodyLarge"
  | "titleSmall"
  | "titleMedium"
  | "titleLarge"
  | "displaySmall"
  | "displayMedium"
  | "displayLarge"
  | "headlineSmall"
  | "headlineMedium"
  | "headlineLarge";

export type TextViewProps = {
  variant?: TextVariant;
  color?: string;
  type?: string;
} & TextProps;
