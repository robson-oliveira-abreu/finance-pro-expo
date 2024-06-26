import { View } from "react-native";
import { getLocaleDate } from "@application/utils/date";
import { styles } from "./common/styles";
import { ExpenseViewProps } from "./common/types";
import { Button } from "@ui/components/UIComponents";
import { RowData } from "./components/RowData/RowData.view";
import { NavigationHeader } from "@ui/components/NavigationHeader/NavigationHeader.view";
import { ExpenseModal } from "@ui/screens/ExpenseModal";
import { theme } from "@infra/theme/theme";
import { Container } from "@ui/components/Container/Container";

export function ExpenseView(props: ExpenseViewProps) {
  const {
    expense,
    payExpense,
    removeExpense,
    handleOpenEditExpense,
    openEditExpense,
    currency,
  } = props;
  return (
    <Container>
      <NavigationHeader title={expense?.description ?? ""} />

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
        <RowData label="Valor:" value={currency.parse(expense?.amount || 0)} />

        {Boolean(expense?.paid_amount) && (
          <RowData
            label="Valor pago:"
            value={currency.parse(expense?.paid_amount || 0)}
          />
        )}
      </View>

      <View style={styles.footer}>
        {!expense?.paid && (
          <Button variant="contained" onPress={payExpense}>
            Pagar
          </Button>
        )}
        <Button variant="text" onPress={handleOpenEditExpense}>
          Editar
        </Button>
        <Button
          variant="text"
          onPress={removeExpense}
          color={theme.colors.danger}
        >
          Excluir
        </Button>
      </View>

      <ExpenseModal
        expense={expense}
        open={openEditExpense}
        onClose={handleOpenEditExpense}
      />
    </Container>
  );
}
