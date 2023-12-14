import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleProp, ViewStyle, useWindowDimensions } from "react-native";

export class TopTabScreen {
  constructor(public name: string, public component: React.JSX.Element) {}
}

type TopTabProps = {
  screens: Array<TopTabScreen>;
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
        tabBarActiveTintColor: "#ff0c0c",
        tabBarIndicatorStyle: {
          backgroundColor: "#ff0c0c",
        },
      }}
    >
      {screens.map((Screen) => (
        <TopTab.Screen name={Screen.name} children={() => Screen.component} />
      ))}
    </TopTab.Navigator>
  );
};
