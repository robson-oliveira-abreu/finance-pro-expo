import { StyleSheet, View } from "react-native";
import { Text } from "../../../../commons/components/UIComponents";
import { IconButton } from "react-native-paper";

export function Header({ onPress = () => {} }) {
  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.logo}>
        ClientPro
      </Text>

      <IconButton icon="menu" onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontWeight: "700",
  },
});
