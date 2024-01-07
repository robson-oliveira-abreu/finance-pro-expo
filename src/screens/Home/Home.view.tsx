import React from "react";
import { FAB, Surface } from "react-native-paper";
import { useHomeController } from "./Home.controller";
import { styles } from "./styles";

export function Home() {
  const homeScrennController = useHomeController();

  return (
    <Surface style={[styles.container]}>
      <FAB.Group
        visible
        open={homeScrennController.state.open}
        onStateChange={homeScrennController.onStateChange}
        actions={homeScrennController.actions}
        icon="plus"
        onPress={() => console.log("Pressed")}
      />
    </Surface>
  );
}
