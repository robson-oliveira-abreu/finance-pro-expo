import { Image, StyleSheet, View } from "react-native";
import { Text } from "@ui/components/UIComponents/Text";
import { GoalsViewModel } from "@ui/screens/Home/components/Goals/Goals.view-model";
import { isIos } from "src/application/utils/platform";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TileButtonViewModel } from "@ui/components/UIComponents/TileButton/TileButton.view-model";
import Icon from "@expo/vector-icons/Ionicons";
import { Spacer } from "@ui/components/Spacer/Spacer";
import { theme } from "@infra/theme/theme";
import { User } from "@domain/entities/User.entity";

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
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineSmall" style={styles.logo}>
          {user?.name ? `Olá, ${user.name.split(" ").at(0)}` : null}
        </Text>

        <View style={styles.row}>
          <Icon
            name="settings-sharp"
            size={20}
            onPress={onPressSettings}
            color={theme.colors.text}
            style={styles.settingIcon}
          />

          <Spacer x={4} />

          <TouchableOpacity
            onPress={onPressAccount}
            style={styles.accountImageContainer}
          >
            <Image
              style={styles.accountImage}
              source={{ uri: "https://github.com/robson-oliveira-abreu.png" }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Spacer y={16} />

      <GoalsViewModel />

      <View style={styles.content}>
        <TileButtonViewModel title="Despesas" onPress={onPressExpenses} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: theme.colors.background,
    paddingTop: isIos ? 20 : 0,
    paddingBottom: 8,
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
  settingIcon: {
    padding: 8,
  },
  accountImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  accountImage: {
    width: "100%",
    height: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
