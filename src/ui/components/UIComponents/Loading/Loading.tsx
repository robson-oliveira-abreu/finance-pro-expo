import { ActivityIndicator, StyleSheet, View } from "react-native";
import { theme } from "@infra/theme/theme";

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={theme.colors.main} size={"large"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minHeight: "100%",
    backgroundColor: theme.colors.background,
  },
});
