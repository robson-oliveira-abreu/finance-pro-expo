import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import { TextView as Text } from "@ui/components/UIComponents/Text/Text.view";
import { theme } from "@infra/theme/theme";

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
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        <Text variant="titleSmall" style={styles.title}>
          {title}
        </Text>
      </View>
      {icon ?? <Icon name="right" color={theme.colors.text} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
  },
});
