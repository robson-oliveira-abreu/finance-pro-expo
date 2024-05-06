import { TouchableOpacity, View } from "react-native";
import IconButton from "@expo/vector-icons/FontAwesome";
import { Text } from "../UIComponents";
import { PropsWithChildren } from "react";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Spacer } from "../Spacer/Spacer";

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
        <TouchableOpacity
          style={{
            padding: 16,
          }}
          onPress={leftAction?.onPress ?? goBack}
        >
          <IconButton
            name={(leftAction?.icon as any) || "angle-left"}
            size={20}
            style={{
              width: 20,
              height: 20,
            }}
          />
        </TouchableOpacity>
      ) : (
        <Spacer x={52} y={52} />
      )}

      <Text variant="headlineMedium" style={styles.title}>
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
            style={{
              width: 20,
              height: 20,
            }}
          />
        </TouchableOpacity>
      ) : (
        <Spacer x={52} y={52} />
      )}
    </View>
  );
}
