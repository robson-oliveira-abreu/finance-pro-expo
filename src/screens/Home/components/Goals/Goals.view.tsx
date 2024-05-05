import { View } from "react-native";
import { Text } from "../../../../commons/components/UIComponents";
import { styles } from "./common/styles";
import { GoalsViewProps } from "./common/types";
import { monthExpensesAmountByStatus } from "./common/constants";
import { DonutView } from "../../../../commons/components/Donut/Donut.view";

export function GoalsView(props: GoalsViewProps) {
  return (
    <View style={styles.container}>
      {monthExpensesAmountByStatus.map(({ label, key, color }) => (
        <View style={styles.itemContainer} key={key}>
          <Text variant="titleSmall" style={styles.itemTitle}>
            {label}
          </Text>

          <DonutView
            target={props.groupedExpenses.total}
            value={props.groupedExpenses[key]}
            centerText={props.currency.parse(props.groupedExpenses[key])}
            color={color}
          />
        </View>
      ))}
    </View>
  );
}
