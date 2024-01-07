import { FlatList } from "react-native";
import { ExpenseModel } from "../../../../commons/models/Expense.model";
import { Spacer } from "../../../../commons/components/Spacer/Spacer";
import { ExpenseItem } from "../ExpenseItem/ExpenseItem.view";
import { styles } from "./styles";

type ExpenseListProps = {
  data?: Array<ExpenseModel>;
};

export function ExpenseList(props: ExpenseListProps) {
  return (
    <FlatList
      data={props.data}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <Spacer y={12} />}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ExpenseItem expense={item} />}
    />
  );
}
