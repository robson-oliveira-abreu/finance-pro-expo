import { SafeAreaView } from "react-native";
import { DataTable, FAB, Surface } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { styles } from "./common/styles";
import { CreatePlanModal } from "./components/CreatePlanModal/CreatePlanModal.view";
import { currency } from "../../commons/utils/currency";
import { PlanningViewProps } from "./common/types";
import { Button, Text } from "../../commons/components/UIComponents";

export function PlanningView(props: PlanningViewProps) {
  const { modalOpen, planItems, openModal, closeModal } = props;

  return (
    <SafeAreaView style={styles.container}>
      <Surface style={styles.container}>
        <Text variant="headlineLarge">Planejamento</Text>

        <Text variant="bodyMedium">
          Receita - {currency(planItems?.totalRevenue || 0)}
        </Text>
        <Text variant="bodyMedium">
          Despesa - {currency(planItems?.totalExpenses || 0)}
        </Text>

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Descrição</DataTable.Title>
            <DataTable.Title>Valor</DataTable.Title>
            <DataTable.Title>{""}</DataTable.Title>
          </DataTable.Header>
          {planItems?.planItems.map((planItem) => (
            <DataTable.Row key={planItem.id}>
              <DataTable.Cell>{planItem.description}</DataTable.Cell>
              <DataTable.Cell>{currency(planItem.amount)}</DataTable.Cell>
              <DataTable.Cell>
                <Button onPress={() => {}}>
                  <FontAwesome name="pencil" size={16} />
                </Button>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>

        <FAB.Group
          visible
          open={false}
          onStateChange={() => {}}
          actions={[]}
          icon="plus"
          onPress={openModal}
        />

        <CreatePlanModal open={modalOpen} closeModal={closeModal} />
      </Surface>
    </SafeAreaView>
  );
}
