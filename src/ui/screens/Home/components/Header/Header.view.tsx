import { Image, View, Text as RNText } from "react-native";
import { Text } from "@ui/components/UIComponents/Text";
import { GoalsViewModel } from "@ui/screens/Home/components/Goals/Goals.view-model";
import { isIos } from "src/application/utils/platform";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TileButtonViewModel } from "@ui/components/UIComponents/TileButton/TileButton.view-model";
import Icon from "@expo/vector-icons/Ionicons";
import { Spacer } from "@ui/components/Spacer/Spacer";
import { User } from "@domain/entities/User.entity";
import { useTheme } from "@/application/Hooks/useTheme";
import { darkColorsTheme } from "@/infra/theme/dark.colors.theme";
import { lightColorsTheme } from "@/infra/theme/light.colors.theme";

type HeaderProps = {
  user: User | null;
  onPressAccount: () => void;
  onPressExpenses: () => void;
  onPressSettings: () => void;
};

export function Header({
  user,
  onPressAccount,
  onPressExpenses,
  onPressSettings,
}: HeaderProps) {
  const { isDark } = useTheme();
  return (
    <View
      className={`w-full ${isDark("bg-dark-background", "bg-background")} ${
        isIos ? "mt-5" : ""
      } mb-2`}
    >
      <View className="w-full flex-row justify-between items-center px-5">
        <Text variant="headlineSmall">
          {user?.name ? `Olá, ${user.name.split(" ").at(0)}` : null}
        </Text>

        <View className="flex flex-row">
          <Icon
            name="settings-sharp"
            size={20}
            onPress={onPressSettings}
            color={isDark(darkColorsTheme.text, lightColorsTheme.text)}
            style={{ padding: 8 }}
          />

          <Spacer x={4} />

          <TouchableOpacity
            onPress={onPressAccount}
            className="w-10 h-10 rounded-full overflow-hidden"
          >
            <Image
              className="w-full h-full"
              source={{ uri: "https://github.com/robson-oliveira-abreu.png" }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Spacer y={16} />

      <GoalsViewModel />

      <View className="px-5">
        <TileButtonViewModel title="Despesas" onPress={onPressExpenses} />
      </View>
    </View>
  );
}
