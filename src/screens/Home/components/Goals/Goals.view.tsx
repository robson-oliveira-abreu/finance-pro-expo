import { View } from "react-native";
import { Text } from "../../../../commons/components/UIComponents";
import { styles } from "./common/styles";
import { GoalsViewProps } from "./common/types";
import { currency } from "../../../../commons/utils/currency";
import { monthExpensesAmountByStatus } from "./common/constants";

export function GoalsView(props: GoalsViewProps) {
  return (
    <View style={styles.container}>
      {monthExpensesAmountByStatus.map(({ label, key }) => (
        <View style={styles.itemContainer} key={key}>
          <Text variant="titleSmall" style={styles.itemTitle}>
            {label}
          </Text>

          <View style={styles.itemContent}>
            <Text variant="titleMedium" style={styles.text}>
              {currency(props.groupedExpenses[key])}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}
