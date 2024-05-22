import { useTheme } from "@/application/Hooks/useTheme";
import { isIos } from "@/application/utils/platform";
import { View, ViewProps } from "react-native";

export function Container({ className, ...props }: ViewProps) {
  const { isDark } = useTheme();
  return (
    <View
      className={`
        flex flex-1 min-h-full px-5 pb-5 
        ${isIos ? "pt-6" : "pt-1"} 
        ${isDark("bg-dark-background", "bg-background")}
      `}
      {...props}
    />
  );
}
