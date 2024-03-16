import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { Text } from "../UIComponents";
import { PropsWithChildren } from "react";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

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

  const goBack = () => {
    navigator.goBack();
  };
  return (
    <View style={styles.container}>
      {leftAction || !noGoBack ? (
        <IconButton
          icon={leftAction?.icon || "arrow-left"}
          onPress={leftAction?.onPress ?? goBack}
        />
      ) : (
        <View />
      )}

      <Text variant="headlineMedium" style={styles.title}>
        {title}
      </Text>

      {rightAction ? (
        <IconButton icon={rightAction.icon} onPress={rightAction.onPress} />
      ) : (
        <View />
      )}
    </View>
  );
}
