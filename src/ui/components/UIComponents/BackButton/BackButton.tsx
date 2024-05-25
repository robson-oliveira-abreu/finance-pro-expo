import { TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@/application/Hooks/useTheme";
import { darkColorsTheme } from "@/infra/theme/dark.colors.theme";
import { lightColorsTheme } from "@/infra/theme/light.colors.theme";

export function BackButton() {
  const navigation = useNavigation();
  const { isDark } = useTheme();

  return (
    <TouchableOpacity className="py-2 px-2" onPress={navigation.goBack}>
      <Icon
        name="angle-left"
        size={20}
        color={isDark(darkColorsTheme.text, lightColorsTheme.text)}
      />
    </TouchableOpacity>
  );
}
