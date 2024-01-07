import { View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import { currency } from "../../commons/currency";
import { getLocaleDate } from "../../commons/date";
import { styles } from "./styles";
import { useExpenseController } from "./Expense.controller";

export function Expense() {
  const expenseController = useExpenseController();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" onPress={expenseController.goBack} />
        <IconButton icon="dots-vertical" onPress={() => {}} />
      </View>

      <View style={styles.content}>
        <Text variant="headlineMedium">
          {expenseController.expense?.description}
        </Text>

        <Text variant="bodyLarge">
          <Text style={{ fontWeight: "700" }}>Status: </Text>
          {expenseController.expense?.paid ? "Pago" : "A Pagar"}
        </Text>

        <Text variant="bodyLarge">
          <Text style={{ fontWeight: "700" }}>Parcela: </Text>
          {expenseController.expense?.installment}/
          {expenseController.expense?.installments}
        </Text>

        <Text variant="bodyLarge">
          <Text style={{ fontWeight: "700" }}>Observação: </Text>
          {expenseController.expense?.observation}
        </Text>

        <Text variant="bodyLarge">
          <Text style={{ fontWeight: "700" }}>Data de Vencimento: </Text>
          {getLocaleDate(expenseController.expense?.due_date || new Date())}
        </Text>

        <Text variant="bodyLarge">
          <Text style={{ fontWeight: "700" }}>Valor: </Text>
          {currency(expenseController.expense?.amount || 0)}
        </Text>

        {Boolean(expenseController.expense?.paid_amount) && (
          <Text variant="bodyLarge">
            <Text style={{ fontWeight: "700" }}>Valor pago: </Text>
            {currency(expenseController.expense?.paid_amount || 0)}
          </Text>
        )}
      </View>

      <View style={styles.footer}>
        {!expenseController.expense?.paid && (
          <Button mode="contained" onPress={expenseController.payExpense}>
            Pagar
          </Button>
        )}
        <Button mode="text" onPress={expenseController.removeExpense}>
          Excluir
        </Button>
      </View>
    </View>
  );
}
