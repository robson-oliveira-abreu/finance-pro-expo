import React, { ReactNode } from "react";
import { FAB, Text } from "react-native-paper";
import { styles } from "./styles";
import { TopTabRoutes } from "../../infra/routes/TopTab.routes";
import { View } from "react-native";
import { ExpensesController } from "./Expenses.controller";
import { Select } from "../../commons/components/Select/Select.view";
import { AddExpenseModal } from "./components/AddExpenseModal/AddExpenseModal.view";
import { isWeb } from "../../commons/platform";

export const Expenses = (): ReactNode => {
  const expensesController = ExpensesController();

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Despesas
      </Text>

      <Select
        onSelect={expensesController.onSelectMonth}
        selected={expensesController.selectedMonth}
        style={{ paddingHorizontal: 20, marginBottom: isWeb ? 20 : 0 }}
      />

      <TopTabRoutes screens={expensesController.getScreens()} />

      <FAB.Group
        visible
        open={expensesController.openFAB}
        onStateChange={expensesController.onStateChange}
        actions={expensesController.getActions()}
        icon="plus"
      />
      {expensesController.modal.open && (
        <AddExpenseModal
          open={expensesController.modal.open}
          type={expensesController.modal.type}
          onClose={expensesController.onChangeModal}
        />
      )}
    </View>
  );
};
