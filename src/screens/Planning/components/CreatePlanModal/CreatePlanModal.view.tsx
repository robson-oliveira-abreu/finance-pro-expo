import { Modal, View } from "react-native";
import {
  Button,
  IconButton,
  SegmentedButtons,
  TextInput,
} from "react-native-paper";
import { Spacer } from "../../../../commons/components/Spacer/Spacer";
import { CreatePlanProps } from "./types";
import { KeyboardAvoidingView } from "../../../../commons/components/KeyboardAvoidingView/KeyboardAvoidingView.view";
import { CreatePlanModalController } from "./CreatePlanModal.controller";
import { styles } from "./styles";
import { buttons } from "./constants";

export function CreatePlanModal(props: CreatePlanProps) {
  const controller = CreatePlanModalController(props);
  return (
    <Modal
      visible={props.open}
      presentationStyle="pageSheet"
      animationType="slide"
    >
      <KeyboardAvoidingView>
        <View style={styles.container}>
          <IconButton icon="close" onPress={props.closeModal} />

          <SegmentedButtons
            value={controller.planType}
            onValueChange={controller.onTypeChange}
            buttons={buttons}
          />

          <TextInput
            label="Descrição"
            onChangeText={controller.onChange("description")}
          />

          <TextInput
            label="Valor"
            inputMode="decimal"
            left={
              <TextInput.Affix text="R$" textStyle={styles.affixTextStyle} />
            }
            onChangeText={controller.onChange("amount")}
          />

          <Spacer flex={1} />

          <Button mode="contained" onPress={controller.onSubmit}>
            Salvar
          </Button>

          <Spacer y={24} />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
