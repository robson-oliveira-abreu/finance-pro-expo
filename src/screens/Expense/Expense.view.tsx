import { View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import { currency } from "../../commons/currency";
import { getLocaleDate } from "../../commons/date";
import { styles } from "./styles";
import { useExpenseController } from "./Expense.controller";
import { Spacer } from "../../components/Spacer/Spacer";

export function Expense() {
  const { payExpense, removeExpense, expense, navigator } =
    useExpenseController();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" onPress={navigator.goBack} />
        <IconButton icon="dots-vertical" onPress={() => {}} />
      </View>

      <View style={styles.content}>
        <Text variant="headlineMedium">{expense.description}</Text>

        <Text variant="bodyLarge">
          <Text style={{ fontWeight: "700" }}>Status: </Text>
          {expense.paid ? "Pago" : "A Pagar"}
        </Text>

        <Text variant="bodyLarge">
          <Text style={{ fontWeight: "700" }}>Parcela: </Text>
          {expense.installment}/{expense.installments}
        </Text>

        <Text variant="bodyLarge">
          <Text style={{ fontWeight: "700" }}>Observação: </Text>
          {expense.observation}
        </Text>

        <Text variant="bodyLarge">
          <Text style={{ fontWeight: "700" }}>Data de Vencimento: </Text>
          {getLocaleDate(expense?.due_date)}
        </Text>

        <Text variant="bodyLarge">
          <Text style={{ fontWeight: "700" }}>Valor: </Text>
          {currency(expense.amount)}
        </Text>

        {Boolean(expense.paid_amount) && (
          <Text variant="bodyLarge">
            <Text style={{ fontWeight: "700" }}>Valor pago: </Text>
            {currency(expense.paid_amount)}
          </Text>
        )}
      </View>

      <View style={styles.footer}>
        {!expense?.paid && (
          <Button mode="contained" onPress={payExpense}>
            Pagar
          </Button>
        )}
        <Button mode="text" onPress={removeExpense}>
          Excluir
        </Button>
      </View>
    </View>
  );
}
