import * as React from "react";
import { Drawer as RNPDrawer } from "react-native-paper";

export function Drawer({ navigation }) {
  const [active, setActive] = React.useState("");

  return (
    <RNPDrawer.Section title="Some title">
      <RNPDrawer.Item
        label="First Item"
        active={active === "first"}
        onPress={() => navigation.navigate("home")}
      />
      <RNPDrawer.Item
        label="Second Item"
        active={active === "second"}
        onPress={() => navigation.navigate("home2")}
      />
    </RNPDrawer.Section>
  );
}
