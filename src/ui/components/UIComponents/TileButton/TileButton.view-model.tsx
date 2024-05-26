import { TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import { TextView as Text } from "@ui/components/UIComponents/Text/Text.view";
import { useTheme } from "@application/Hooks/useTheme";
import { darkColorsTheme } from "@infra/theme/dark.colors.theme";
import { lightColorsTheme } from "@infra/theme/light.colors.theme";

type TileButtonViewModelProps = {
  title: string;
  icon?: React.JSX.Element | undefined;
  onPress: () => void;
};

export function TileButtonViewModel({
  title,
  icon,
  onPress,
}: TileButtonViewModelProps) {
  const { isDark } = useTheme();
  return (
    <TouchableOpacity
      className={`flex flex-row justify-between items-center w-full px-2 py-3 rounded-lg ${isDark(
        "bg-dark-backgroundSecondary",
        "bg-backgroundSecondary"
      )}`}
      onPress={onPress}
    >
      <Text variant="titleMedium">{title}</Text>
      {icon ?? (
        <Icon
          name="right"
          color={isDark(darkColorsTheme.text, lightColorsTheme.text)}
        />
      )}
    </TouchableOpacity>
  );
}
