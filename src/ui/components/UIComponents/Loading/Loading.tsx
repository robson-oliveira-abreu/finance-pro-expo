import { ActivityIndicator, View } from "react-native";
import { theme } from "@infra/theme/theme";
import { useTheme } from "@/application/Hooks/useTheme";

export function Loading() {
  const { isDark } = useTheme();
  return (
    <View
      className={`flex-1 justify-center items-center w-full min-h-full ${isDark(
        "bg-dark-background",
        "bg-background"
      )}`}
    >
      <ActivityIndicator color={theme.colors.main} size={"large"} />
    </View>
  );
}
