import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  Button,
  HelperText,
  IconButton,
  Text,
  TextInput,
} from "react-native-paper";
import { Spacer } from "../../../../components/Spacer/Spacer";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { getLocaleDate } from "../../../../commons/date";
import { AddExpenseModalController } from "./AddExpenseModal.controller";
import { isAndroid, isIos, isWeb } from "../../../../commons/platform";
import { AddExpenseModalProps } from "./types";
import { styles } from "./styles";

export function AddExpenseModal(props: AddExpenseModalProps) {
  const controller = AddExpenseModalController({ onClose: props.onClose });

  return (
    <Modal visible={props.open} onRequestClose={props.onClose}>
      <TouchableWithoutFeedback onPress={!isWeb ? Keyboard.dismiss : () => {}}>
        <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
          <View>
            <IconButton
              icon="close"
              size={28}
              onPress={props.onClose}
              rippleColor="rgba(200,0,0,0.35)"
            />
          </View>
          <View>
            <TextInput
              label="Descrição"
              onChangeText={controller.onChange("description")}
              error={!!controller.errors.get("description")}
            />
            {!!controller.errors.get("description") && (
              <HelperText
                type="error"
                visible={!!controller.errors.get("description")}
              >
                {controller.errors.get("description")}
              </HelperText>
            )}
          </View>
          <View>
            <TextInput
              label="Valor"
              value={controller.formState.amount?.toString()}
              onChangeText={controller.onChange("amount")}
              inputMode="decimal"
              left={
                <TextInput.Affix text="R$" textStyle={styles.affixTextStyle} />
              }
              error={!!controller.errors.get("amount")}
            />
            {!!controller.errors.get("amount") && (
              <HelperText
                type="error"
                visible={!!controller.errors.get("amount")}
              >
                {controller.errors.get("amount")}
              </HelperText>
            )}
          </View>
          <TextInput
            label="Observação"
            onChangeText={controller.onChange("observation")}
          />
          {props.type === "fixed" && (
            <>
              <TextInput
                label="Parcela"
                keyboardType="numeric"
                onChangeText={controller.onChange("installment")}
              />
              <TextInput
                label="Parcelas"
                inputMode="numeric"
                onChangeText={controller.onChange("installments")}
                right={<TextInput.Affix text="vezes" />}
              />
            </>
          )}
          <View>
            <Text>Data de Vencimento:</Text>
            <Spacer vertical={6} />
            {isWeb && (
              <View style={styles.rowInputs}>
                <TextInput
                  label="Dia"
                  style={styles.flexOne}
                  inputMode="numeric"
                  keyboardType="numeric"
                  defaultValue={`${
                    controller.formState.due_date?.getDate() || ""
                  }`}
                  onChangeText={controller.onChangeDateWeb("due_date", "day")}
                />
                <TextInput
                  label="Mês"
                  style={styles.flexOne}
                  inputMode="numeric"
                  defaultValue={`${
                    controller.formState.due_date?.getMonth() || ""
                  }`}
                  onChangeText={controller.onChangeDateWeb("due_date", "month")}
                  keyboardType="numeric"
                />
                <TextInput
                  label="Ano"
                  style={styles.flexOne}
                  inputMode="numeric"
                  defaultValue={`${
                    controller.formState.due_date?.getFullYear() || ""
                  }`}
                  onChangeText={controller.onChangeDateWeb("due_date", "year")}
                  keyboardType="numeric"
                />
              </View>
            )}
            {isAndroid && (
              <Button onPress={controller.handleOpenAndroidDate("due_date")}>
                {controller.formState?.due_date
                  ? getLocaleDate(controller.formState.due_date)
                  : "Selecione uma data"}
              </Button>
            )}
            {(isIos || controller.openAndroidDate.due_date) && (
              <RNDateTimePicker
                value={controller.formState.due_date || new Date()}
                mode="date"
                locale="pt-BR"
                onChange={(e, date) =>
                  controller.onChangeDateNative("due_date", date)
                }
              />
            )}
          </View>
          <Spacer flex={1} />
          <Button mode="contained" onPress={controller.onSubmit}>
            Salvar
          </Button>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
