import { PropsWithChildren } from "react";
import { ActivityIndicator, View } from "react-native";

export function WithLoading({
  loading,
  children,
}: { loading: boolean } & PropsWithChildren) {
  return loading ? (
    <View className="flex flex-1 min-h-full">
      <ActivityIndicator className="text-main" />
    </View>
  ) : (
    children
  );
}
