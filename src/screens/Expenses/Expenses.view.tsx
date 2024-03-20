import React, { ReactNode } from "react";
import { FAB, Surface } from "react-native-paper";
import { styles } from "./common/styles";
import { TopTabRoutes, TopTabScreen } from "../../infra/routes/TopTab.routes";
import { Select } from "../../commons/components/Select/Select.view";
import { AddExpenseModalViewModel } from "./components/AddExpenseModal/AddExpenseModal.view-model";
import { isWeb } from "../../commons/utils/platform";
import { ExpensesViewProps } from "./common/types";
import { ExpenseList } from "../../commons/components/ExpenseList/ExpenseList.view";

export const ExpensesView = (props: ExpensesViewProps): ReactNode => {
  const {
    openFAB,
    modal,
    selectedMonth,
    unPaidExpense,
    paidExpense,
    onSelectMonth,
    onStateChange,
    onChangeModal,
  } = props;
  return (
    <Surface style={styles.container}>
      <Select
        onSelect={onSelectMonth}
        selected={selectedMonth}
        style={{ paddingHorizontal: 20, marginBottom: isWeb ? 20 : 0 }}
      />

      <TopTabRoutes
        screens={[
          new TopTabScreen("A Pagar", ExpenseList, { data: unPaidExpense }),
          new TopTabScreen("Pago", ExpenseList, { data: paidExpense }),
        ]}
      />

      <FAB.Group
        visible
        open={openFAB}
        onStateChange={onStateChange}
        actions={[
          {
            icon: "plus",
            label: "Despesa",
            onPress: onChangeModal("expense"),
          },
          {
            icon: "plus",
            label: "Conta avulsa",
            onPress: onChangeModal("loose"),
          },
          {
            icon: "pin",
            label: "Conta fixa",
            onPress: onChangeModal("fixed"),
          },
        ]}
        icon="plus"
      />
      {modal.open && (
        <AddExpenseModalViewModel
          open={modal.open}
          type={modal.type}
          onClose={onChangeModal()}
        />
      )}
    </Surface>
  );
};
