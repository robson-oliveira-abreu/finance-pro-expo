import React from "react";
import { Surface } from "react-native-paper";
import { styles } from "./common/styles";
import { THomeModel } from "./common/types";
import { Header } from "./components/Header/Header.view";
import { GoalsViewModel } from "./components/Goals/Goals.view-model";
import { ExpenseList } from "../../commons/components/ExpenseList/ExpenseList.view";
import { Spacer } from "../../commons/components/Spacer/Spacer";
import { Text } from "../../commons/components/UIComponents";

export function HomeView(props: THomeModel) {
  const { onPressMenu, payableExpenses } = props;
  return (
    <Surface style={[styles.container]}>
      <Header onPress={onPressMenu} />

      <GoalsViewModel />

      <Spacer y={12} />

      {/* TODO Chart */}

      <ExpenseList title="A Pagar" data={payableExpenses} />
    </Surface>
  );
}
