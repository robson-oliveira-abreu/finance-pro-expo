import { SafeAreaView, View } from "react-native";
import { Text, DataTable, Button, FAB } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { styles } from "./styles";
import { planningController } from "./Planning.controller";
import { CreatePlanModal } from "./components/CreatePlanModal/CreatePlanModal.view";
import { currency } from "../../commons/utils/currency";

function Planning() {
  const controller = planningController();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text variant="headlineLarge">Planejamento</Text>

        <Text variant="bodyMedium">
          Receita - {currency(controller.planItems?.totalRevenue || 0)}
        </Text>
        <Text variant="bodyMedium">
          Despesa - {currency(controller.planItems?.totalExpenses || 0)}
        </Text>

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Descrição</DataTable.Title>
            <DataTable.Title>Valor</DataTable.Title>
            <DataTable.Title>{""}</DataTable.Title>
          </DataTable.Header>
          {controller.planItems?.planItems.map((planItem) => (
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
          onPress={controller.openModal}
        />

        <CreatePlanModal
          open={controller.modalOpen}
          closeModal={controller.closeModal}
        />
      </View>
    </SafeAreaView>
  );
}

export { Planning };
