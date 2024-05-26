import { useTheme } from "@application/Hooks/useTheme";
import { isIos } from "@application/utils/platform";
import { SafeAreaView, View, ViewProps } from "react-native";

export function Container({ className, ...props }: ViewProps) {
  const { isDark } = useTheme();
  return (
    <SafeAreaView
      className={`flex flex-1 min-h-full ${isDark(
        "bg-dark-background",
        "bg-background"
      )}`}
    >
      <View className="flex flex-1 min-h-full px-5 pb-5 pt-1" {...props} />
    </SafeAreaView>
  );
}
