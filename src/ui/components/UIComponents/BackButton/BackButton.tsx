import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { theme } from "@infra/theme/theme";

export function BackButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container} onPress={navigation.goBack}>
      <Icon name="angle-left" size={20} color={theme.colors.text} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
});
