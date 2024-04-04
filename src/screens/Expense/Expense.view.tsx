import { View } from "react-native";
import { Surface } from "react-native-paper";
import { currency } from "../../commons/utils/currency";
import { getLocaleDate } from "../../commons/utils/date";
import { styles } from "./common/styles";
import { ExpenseViewProps } from "./common/types";
import { Button } from "../../commons/components/UIComponents";
import { RowData } from "./components/RowData/RowData.view";
import { NavigationHeader } from "../../commons/components/NavigationHeader/NavigationHeader.view";

export function ExpenseView(props: ExpenseViewProps) {
  const { expense, payExpense, removeExpense } = props;
  return (
    <Surface style={styles.container}>
      <NavigationHeader
        title={expense?.description ?? ""}
        rightAction={{ icon: "dots-vertical", onPress: () => {} }}
      />

      <View style={styles.content}>
        <RowData label="Status:" value={expense?.paid ? "Pago" : "A Pagar"} />
        <RowData
          label="Parcela:"
          value={`${expense?.installment}/${expense?.installments}`}
        />
        <RowData label="Observação:" value={expense?.observation ?? ""} />
        <RowData
          label="Data de Vencimento:"
          value={getLocaleDate(expense?.due_date || new Date())}
        />
        <RowData label="Valor:" value={currency(expense?.amount || 0)} />

        {Boolean(expense?.paid_amount) && (
          <RowData
            label="Valor pago:"
            value={currency(expense?.paid_amount || 0)}
          />
        )}
      </View>

      <View style={styles.footer}>
        {!expense?.paid && (
          <Button mode="contained" onPress={payExpense}>
            Pagar
          </Button>
        )}
        <Button mode="text" onPress={() => {}}>
          Editar
        </Button>
        <Button mode="text" onPress={removeExpense}>
          Excluir
        </Button>
      </View>
    </Surface>
  );
}
