import { Modal, View } from "react-native";
import {
  HelperText,
  IconButton,
  Surface,
  TextInput,
  useTheme,
} from "react-native-paper";
import { Spacer } from "../../../../commons/components/Spacer/Spacer";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { getLocaleDate } from "../../../../commons/utils/date";
import { isAndroid, isIos, isWeb } from "../../../../commons/utils/platform";
import { AddExpenseModalViewProps } from "./common/types";
import { styles } from "./common/styles";
import { KeyboardAvoidingView } from "../../../../commons/components/KeyboardAvoidingView/KeyboardAvoidingView.view";
import { Button, Text } from "../../../../commons/components/UIComponents";

export function AddExpenseModalView(props: AddExpenseModalViewProps) {
  const {
    onClose,
    type,
    open,
    errors,
    webDateErrors,
    formState,
    openAndroidDate,
    onChange,
    onSubmit,
    onChangeDateWeb,
    handleOpenAndroidDate,
    onChangeDateNative,
  } = props;
  const { colors } = useTheme();

  return (
    <Modal visible={open} onRequestClose={onClose}>
      <Surface style={{ minHeight: "100%" }}>
        <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
          <View>
            <IconButton
              icon="close"
              size={28}
              onPress={onClose}
              rippleColor="rgba(200,0,0,0.35)"
            />
          </View>
          <View>
            <TextInput
              label="Descrição"
              onChangeText={onChange("description")}
              error={!!errors.get("description")}
            />
            {!!errors.get("description") && (
              <HelperText type="error" visible={!!errors.get("description")}>
                {errors.get("description")}
              </HelperText>
            )}
          </View>
          <View>
            <TextInput
              label="Valor"
              value={formState.amount?.toString()}
              onChangeText={onChange("amount")}
              inputMode="decimal"
              left={
                <TextInput.Affix text="R$" textStyle={styles.affixTextStyle} />
              }
              error={!!errors.get("amount")}
            />
            {!!errors.get("amount") && (
              <HelperText type="error" visible={!!errors.get("amount")}>
                {errors.get("amount")}
              </HelperText>
            )}
          </View>
          <TextInput
            label="Observação"
            onChangeText={onChange("observation")}
          />
          {type === "fixed" && (
            <>
              <TextInput
                label="Parcela"
                keyboardType="numeric"
                onChangeText={onChange("installment")}
              />
              <TextInput
                label="Parcelas"
                inputMode="numeric"
                onChangeText={onChange("installments")}
                right={<TextInput.Affix text="vezes" />}
              />
            </>
          )}
          <View>
            <Text>
              {props.type === "expense"
                ? "Data da despesa:"
                : "Data de Vencimento:"}
            </Text>
            <Spacer y={6} />
            {isWeb && (
              <View style={styles.rowInputs}>
                <View style={styles.flexOne}>
                  <TextInput
                    label="Dia"
                    inputMode="numeric"
                    keyboardType="numeric"
                    defaultValue={`${formState.due_date?.getDate() || ""}`}
                    onChangeText={onChangeDateWeb("due_date", "day")}
                    error={Boolean(webDateErrors.get("day"))}
                  />
                  {Boolean(webDateErrors.get("day")) && (
                    <HelperText type="error" visible>
                      {webDateErrors.get("day")}
                    </HelperText>
                  )}
                </View>
                <View style={styles.flexOne}>
                  <TextInput
                    label="Mês"
                    inputMode="numeric"
                    defaultValue={`${formState.due_date?.getMonth() || ""}`}
                    onChangeText={onChangeDateWeb("due_date", "month")}
                    keyboardType="numeric"
                    error={Boolean(webDateErrors.get("month"))}
                  />
                  {Boolean(webDateErrors.get("month")) && (
                    <HelperText type="error" visible>
                      {webDateErrors.get("month")}
                    </HelperText>
                  )}
                </View>
                <View style={styles.flexOne}>
                  <TextInput
                    label="Ano"
                    inputMode="numeric"
                    defaultValue={`${formState.due_date?.getFullYear() || ""}`}
                    onChangeText={onChangeDateWeb("due_date", "year")}
                    keyboardType="numeric"
                    error={Boolean(webDateErrors.get("year"))}
                  />
                  {Boolean(webDateErrors.get("year")) && (
                    <HelperText type="error" visible>
                      {webDateErrors.get("year")}
                    </HelperText>
                  )}
                </View>
              </View>
            )}
            {isAndroid && (
              <Button onPress={handleOpenAndroidDate("due_date")}>
                {formState?.due_date
                  ? getLocaleDate(formState.due_date)
                  : "Selecione uma data"}
              </Button>
            )}
            {(isIos || openAndroidDate.due_date) && (
              <RNDateTimePicker
                value={formState.due_date || new Date()}
                mode="date"
                locale="pt-BR"
                onChange={(e, date) => {
                  if (date) onChangeDateNative("due_date", date);
                }}
              />
            )}
          </View>
          <Spacer flex={1} />
          <Button
            mode="contained"
            onPress={onSubmit}
            textColor={colors.onBackground}
          >
            Salvar
          </Button>
        </KeyboardAvoidingView>
      </Surface>
    </Modal>
  );
}
