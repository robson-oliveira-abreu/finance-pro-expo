import { FlatList } from "react-native";
import { ExpenseModel } from "../../../../models/Expense.model";
import { Spacer } from "../../../../components/Spacer/Spacer";
import { ExpenseItem } from "../ExpenseItem/ExpenseItem.view";
import { styles } from "./styles";

type ExpenseListProps = {
  data: Array<ExpenseModel>;
};

export function ExpenseList(props: ExpenseListProps) {
  return (
    <FlatList
      data={props.data}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <Spacer vertical={12} />}
      renderItem={({ item }) => <ExpenseItem expense={item} />}
    />
  );
}
