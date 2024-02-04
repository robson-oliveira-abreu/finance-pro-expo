import { Modal, View } from "react-native";
import {
  Button,
  HelperText,
  IconButton,
  Text,
  TextInput,
} from "react-native-paper";
import { Spacer } from "../../../../commons/components/Spacer/Spacer";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { getLocaleDate } from "../../../../commons/utils/date";
import { AddExpenseModalController } from "./AddExpenseModal.controller";
import { isAndroid, isIos, isWeb } from "../../../../commons/utils/platform";
import { AddExpenseModalProps } from "./types";
import { styles } from "./styles";
import { KeyboardAvoidingView } from "../../../../commons/components/KeyboardAvoidingView/KeyboardAvoidingView.view";

export function AddExpenseModal(props: AddExpenseModalProps) {
  const controller = AddExpenseModalController({ onClose: props.onClose });

  return (
    <Modal visible={props.open} onRequestClose={props.onClose}>
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
          <Spacer y={6} />
          {isWeb && (
            <View style={styles.rowInputs}>
              <View style={styles.flexOne}>
                <TextInput
                  label="Dia"
                  inputMode="numeric"
                  keyboardType="numeric"
                  defaultValue={`${
                    controller.formState.due_date?.getDate() || ""
                  }`}
                  onChangeText={controller.onChangeDateWeb("due_date", "day")}
                  error={Boolean(controller.webDateErrors.get("day"))}
                />
                {Boolean(controller.webDateErrors.get("day")) && (
                  <HelperText type="error" visible>
                    {controller.webDateErrors.get("day")}
                  </HelperText>
                )}
              </View>
              <View style={styles.flexOne}>
                <TextInput
                  label="Mês"
                  inputMode="numeric"
                  defaultValue={`${
                    controller.formState.due_date?.getMonth() || ""
                  }`}
                  onChangeText={controller.onChangeDateWeb("due_date", "month")}
                  keyboardType="numeric"
                  error={Boolean(controller.webDateErrors.get("month"))}
                />
                {Boolean(controller.webDateErrors.get("month")) && (
                  <HelperText type="error" visible>
                    {controller.webDateErrors.get("month")}
                  </HelperText>
                )}
              </View>
              <View style={styles.flexOne}>
                <TextInput
                  label="Ano"
                  inputMode="numeric"
                  defaultValue={`${
                    controller.formState.due_date?.getFullYear() || ""
                  }`}
                  onChangeText={controller.onChangeDateWeb("due_date", "year")}
                  keyboardType="numeric"
                  error={Boolean(controller.webDateErrors.get("year"))}
                />
                {Boolean(controller.webDateErrors.get("year")) && (
                  <HelperText type="error" visible>
                    {controller.webDateErrors.get("year")}
                  </HelperText>
                )}
              </View>
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
              onChange={(e, date) => {
                if (date) controller.onChangeDateNative("due_date", date);
              }}
            />
          )}
        </View>
        <Spacer flex={1} />
        <Button mode="contained" onPress={controller.onSubmit}>
          Salvar
        </Button>
      </KeyboardAvoidingView>
    </Modal>
  );
}
