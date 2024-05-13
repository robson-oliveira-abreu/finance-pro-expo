import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleProp, ViewStyle, useWindowDimensions } from "react-native";
import { Expense } from "@core/entities/Expense";

export class TopTabScreen<TProps> {
  constructor(
    public name: string,
    public component: (props: TProps) => React.JSX.Element,
    public props: TProps
  ) {}
}

type TopTabProps = {
  screens?: Array<TopTabScreen<{ data?: Expense[] }>>;
};

const TopTab = createMaterialTopTabNavigator();

export const TopTabRoutes = ({ screens }: TopTabProps) => {
  const { width } = useWindowDimensions();

  const style: StyleProp<ViewStyle> = {
    width,
    flex: 1,
  };

  return (
    <TopTab.Navigator
      style={style}
      screenOptions={{
        tabBarActiveTintColor: "red",
        tabBarIndicatorContainerStyle: {
          backgroundColor: "white",
        },
        tabBarIndicatorStyle: {
          backgroundColor: "red",
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
};
