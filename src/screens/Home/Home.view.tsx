import React from "react";
import { styles } from "./common/styles";
import { THomeModel } from "./common/types";
import { HeaderModelView } from "./components/Header/Header.view-model";
import { ExpenseList } from "../../commons/components/ExpenseList/ExpenseList.view";
import { View } from "react-native";

export function HomeView(props: THomeModel) {
  return (
    <View style={styles.container}>
      <ExpenseList
        title="Despesas proximas"
        HeaderComponent={
          <HeaderModelView
            onPress={props.onPressMenu}
            onPressAccount={props.onPressAccount}
            onPressExpenses={props.onPressExpenses}
          />
        }
        data={props.payableExpenses}
      />
    </View>
  );
}
