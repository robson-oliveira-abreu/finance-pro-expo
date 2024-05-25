import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "@/application/Hooks/useTheme";
import { darkColorsTheme } from "../theme/dark.colors.theme";
import { lightColorsTheme } from "../theme/light.colors.theme";

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
  const { isDark } = useTheme();

  return (
    <TopTab.Navigator
      style={{ width: `100%`, flex: 1 }}
      screenOptions={{
        tabBarActiveTintColor: isDark(
          darkColorsTheme.main,
          lightColorsTheme.main
        ),
        tabBarIndicatorContainerStyle: {
          backgroundColor: isDark(
            darkColorsTheme.background,
            lightColorsTheme.background
          ),
        },
        tabBarIndicatorStyle: {
          backgroundColor: isDark(darkColorsTheme.main, lightColorsTheme.main),
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
