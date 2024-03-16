import React from "react";
import { Surface } from "react-native-paper";
import { styles } from "./common/styles";
import { THomeModel } from "./common/types";
import { Header } from "./components/Header/Header.view";
import { GoalsViewModel } from "./components/Goals/Goals.view-model";

export function HomeView(props: THomeModel) {
  const { onPressMenu } = props;
  return (
    <Surface style={[styles.container]}>
      <Header onPress={onPressMenu} />

      <GoalsViewModel />
    </Surface>
  );
}
