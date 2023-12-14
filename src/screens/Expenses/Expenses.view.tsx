import React, {ReactNode} from "react";
import {FAB, RadioButton, Text} from "react-native-paper";
import {styles} from "./styles";
import {TopTabRoutes} from "../../routes/TopTab.routes";
import {View} from "react-native";
import {AddExpenseModal} from "./components/AddExpenseModal/AddExpenseModal.view";
import {ExpensesScreenService} from "./Expenses.service";
import {ExpensesController} from "./Expenses.controller";
import {Select} from "../../components/Select/Select.view";

export const Expenses = (): ReactNode => {
    const controller = ExpensesController();

    return (
        <View style={styles.container}>
            <Text variant="headlineSmall" style={styles.title}>
                Despesas
            </Text>

            <Select
                onSelect={controller.onSelectMonth}
                selected={controller.selectedMonth}
                style={{paddingHorizontal: 20, paddingBottom: 20}}
            />

            <TopTabRoutes
                screens={controller.getScreens()}
            />

            <FAB.Group
                visible
                open={controller.openFAB}
                onStateChange={controller.onStateChange}
                actions={ExpensesScreenService.getFABActions(controller.onChangeModal)}
                icon="plus"
            />
            {controller.modal.open && (
                <AddExpenseModal
                    open={controller.modal.open}
                    type={controller.modal.type}
                    onClose={controller.onChangeModal}
                />
            )}
        </View>
    );
};
