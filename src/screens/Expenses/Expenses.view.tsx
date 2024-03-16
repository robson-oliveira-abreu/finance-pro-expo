import React, { ReactNode } from "react";
import { FAB, Surface } from "react-native-paper";
import { styles } from "./common/styles";
import { TopTabRoutes } from "../../infra/routes/TopTab.routes";
import { Select } from "../../commons/components/Select/Select.view";
import { AddExpenseModal } from "./components/AddExpenseModal/AddExpenseModal.view";
import { isWeb } from "../../commons/utils/platform";
import { ExpensesViewProps } from "./common/types";

export const ExpensesView = (props: ExpensesViewProps): ReactNode => {
  const {
    openFAB,
    modal,
    selectedMonth,
    getActions,
    getScreens,
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

      <TopTabRoutes screens={getScreens()} />

      <FAB.Group
        visible
        open={openFAB}
        onStateChange={onStateChange}
        actions={getActions()}
        icon="plus"
      />
      {modal.open && (
        <AddExpenseModal
          open={modal.open}
          type={modal.type}
          onClose={onChangeModal}
        />
      )}
    </Surface>
  );
};
