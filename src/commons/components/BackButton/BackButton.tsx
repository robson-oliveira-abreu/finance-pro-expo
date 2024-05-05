import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

export function BackButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container} onPress={navigation.goBack}>
      <Icon name="angle-left" size={20} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    padding: 16,
  },
});
