import { StyleSheet, View } from "react-native";
import { Text } from "../../../../commons/components/UIComponents";
import { IconButton } from "react-native-paper";
import { GoalsViewModel } from "../Goals/Goals.view-model";
import { theme } from "../../../../commons/theme/theme";

export function Header({ onPress = () => {} }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineSmall" style={styles.logo}>
          Finanças Pro
        </Text>

        <IconButton icon="menu" onPress={onPress} />
      </View>
      <GoalsViewModel />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: theme.colors.background,
  },
  content: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    fontWeight: "700",
  },
});
