import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleProp, ViewStyle, useWindowDimensions } from "react-native";
import { theme } from "@infra/theme/theme";

export class TopTabScreen<TProps> {
  constructor(
    public name: string,
    public component: (props: TProps) => React.JSX.Element,
    public props: TProps
  ) {}
}

type TopTabProps<Props> = {
  screens?: Array<TopTabScreen<Props>>;
};

const TopTab = createMaterialTopTabNavigator();

export function TopTabRoutes<Props extends {}>({
  screens,
}: TopTabProps<Props>) {
  const { width } = useWindowDimensions();

  const style: StyleProp<ViewStyle> = {
    width,
    flex: 1,
  };

  return (
    <TopTab.Navigator
      style={style}
      screenOptions={{
        tabBarActiveTintColor: theme.colors.main,
        tabBarIndicatorContainerStyle: {
          backgroundColor: theme.colors.background,
        },
        tabBarIndicatorStyle: {
          backgroundColor: theme.colors.main,
        },
      }}
    >
      {screens?.map((Screen) => (
        <TopTab.Screen
          key={"screen:" + Screen.name}
          name={Screen.name}
          children={() => <Screen.component {...Screen.props} />}
        />
      ))}
    </TopTab.Navigator>
  );
}
