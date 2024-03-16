import { View } from "react-native";
import { IconButton, Surface } from "react-native-paper";
import { currency } from "../../commons/utils/currency";
import { getLocaleDate } from "../../commons/utils/date";
import { styles } from "./common/styles";
import { ExpenseViewProps } from "./common/types";
import { Text, Button } from "../../commons/components/UIComponents";

export function ExpenseView(props: ExpenseViewProps) {
  const { expense, goBack, payExpense, removeExpense } = props;
  return (
    <Surface style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" onPress={goBack} />
        <IconButton icon="dots-vertical" onPress={() => {}} />
      </View>

      <View style={styles.content}>
        <Text variant="headlineMedium">{expense?.description}</Text>

        <Text variant="bodyLarge">
          <Text style={styles.bold}>Status: </Text>
          {expense?.paid ? "Pago" : "A Pagar"}
        </Text>

        <Text variant="bodyLarge">
          <Text style={styles.bold}>Parcela: </Text>
          {expense?.installment}/{expense?.installments}
        </Text>

        <Text variant="bodyLarge">
          <Text style={styles.bold}>Observação: </Text>
          {expense?.observation}
        </Text>

        <Text variant="bodyLarge">
          <Text style={styles.bold}>Data de Vencimento: </Text>
          {getLocaleDate(expense?.due_date || new Date())}
        </Text>

        <Text variant="bodyLarge">
          <Text style={styles.bold}>Valor: </Text>
          {currency(expense?.amount || 0)}
        </Text>

        {Boolean(expense?.paid_amount) && (
          <Text variant="bodyLarge">
            <Text style={styles.bold}>Valor pago: </Text>
            {currency(expense?.paid_amount || 0)}
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
    </Surface>
  );
}
