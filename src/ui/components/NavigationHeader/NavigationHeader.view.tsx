import { TouchableOpacity, View } from "react-native";
import IconButton from "@expo/vector-icons/FontAwesome";
import { Text } from "@ui/components/UIComponents";
import { PropsWithChildren } from "react";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Spacer } from "@ui/components/Spacer/Spacer";
import { useTheme } from "@application/Hooks/useTheme";
import { lightColorsTheme } from "@infra/theme/light.colors.theme";
import { darkColorsTheme } from "@infra/theme/dark.colors.theme";

type Action = {
  icon: string;
  onPress: () => void;
};

type LayoutHeaderProps = {
  title: string;
  leftAction?: Action;
  rightAction?: Action;
  noGoBack?: boolean;
} & PropsWithChildren;

export function NavigationHeader({
  title,
  leftAction,
  rightAction,
  noGoBack = false,
}: LayoutHeaderProps) {
  const navigator = useNavigation();
  const { dark, darkMode } = useTheme();

  const goBack = () => {
    navigator.goBack();
  };
  return (
    <View style={styles.container}>
      {leftAction || !noGoBack ? (
        <TouchableOpacity
          className="w-7 h-7 items-center justify-center"
          onPress={leftAction?.onPress ?? goBack}
        >
          <IconButton
            name={(leftAction?.icon as any) || "angle-left"}
            color={darkMode ? darkColorsTheme.text : lightColorsTheme.text}
            size={24}
          />
        </TouchableOpacity>
      ) : (
        <Spacer x={52} y={52} />
      )}

      <Text variant="titleLarge" style={styles.title}>
        {title}
      </Text>

      {rightAction ? (
        <TouchableOpacity
          style={{
            padding: 16,
          }}
          onPress={rightAction.onPress}
        >
          <IconButton
            size={20}
            name={rightAction.icon as any}
            color={darkMode ? darkColorsTheme.text : lightColorsTheme.text}
          />
        </TouchableOpacity>
      ) : (
        <Spacer x={52} y={52} />
      )}
    </View>
  );
}
