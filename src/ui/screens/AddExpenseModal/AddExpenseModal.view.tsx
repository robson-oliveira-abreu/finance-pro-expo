import { Modal, View } from "react-native";
import { Spacer } from "@ui/components/Spacer/Spacer";
import { Text } from "@ui/components/UIComponents/Text";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { getLocaleDate } from "@infra/utils/date";
import { isAndroid, isIos, isWeb } from "@infra/utils/platform";
import { AddExpenseModalViewProps } from "./common/types";
import { styles } from "./common/styles";
import { KeyboardAvoidingView } from "@ui/components/KeyboardAvoidingView/KeyboardAvoidingView.view";
import { Button } from "@ui/components/UIComponents";
import { Input } from "@ui/components/UIComponents/Input/Input";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SegmentedButton } from "@ui/components/UIComponents/SegmentedButton/SegmentedButton";
import { expenseTypeOptions } from "./common/constants";
import { theme } from "@ui/theme/theme";

export function AddExpenseModalView(props: AddExpenseModalViewProps) {
  const {
    type,
    onClose,
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
    onChangeType,
  } = props;

  return (
    <Modal visible={open} onRequestClose={onClose}>
      <View style={{ minHeight: "100%" }}>
        <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
          <View>
            <Ionicons
              name="close"
              size={28}
              onPress={onClose}
              rippleColor="rgba(200,0,0,0.35)"
            />
          </View>

          <SegmentedButton
            options={expenseTypeOptions}
            onSelect={onChangeType}
          />

          <View>
            <Input
              label="Descrição"
              value={formState.description}
              onChange={onChange("description")}
              error={!!errors.get("description")}
              keyboardType="default"
              inputMode="text"
            />
            {!!errors.get("description") && errors.get("description") && (
              <Text type="error">{errors.get("description")}</Text>
            )}
          </View>
          <View>
            <Input
              label="Valor"
              value={formState.amount?.toString()}
              onChange={onChange("amount")}
              keyboardType="decimal-pad"
              inputMode="decimal"
              left={
                <Ionicons
                  name="logo-usd"
                  size={16}
                  color={theme.colors.shapeDarkSecondary}
                />
              }
              error={!!errors.get("amount")}
            />
            {!!errors.get("amount") && errors.get("amount") && (
              <Text type="error">{errors.get("amount")}</Text>
            )}
          </View>
          <Input
            label="Observação"
            value={formState.observation}
            onChange={onChange("observation")}
            keyboardType="default"
            inputMode="text"
          />
          {type === "fixed" && (
            <>
              <Input
                label="1º Parcela"
                value={formState.installment}
                onChange={onChange("installment")}
                keyboardType="numeric"
                inputMode="decimal"
              />
              <Input
                label="Qtd. Parcelas"
                value={formState.installments}
                onChange={onChange("installments")}
                right={<Text variant="bodySmall">vezes</Text>}
                keyboardType="numeric"
                inputMode="decimal"
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
                  <Input
                    label="Dia"
                    // defaultValue={`${formState.due_date?.getDate() || ""}`}
                    onChange={onChangeDateWeb("due_date", "day")}
                    error={Boolean(webDateErrors.get("day"))}
                    keyboardType="numeric"
                    inputMode="decimal"
                  />
                  {Boolean(webDateErrors.get("day")) && (
                    <Text type="error">{webDateErrors.get("day")}</Text>
                  )}
                </View>
                <View style={styles.flexOne}>
                  <Input
                    label="Mês"
                    // defaultValue={`${formState.due_date?.getMonth() || ""}`}
                    onChange={onChangeDateWeb("due_date", "month")}
                    error={Boolean(webDateErrors.get("month"))}
                    keyboardType="numeric"
                    inputMode="decimal"
                  />
                  {Boolean(webDateErrors.get("month")) && (
                    <Text type="error">{webDateErrors.get("month")}</Text>
                  )}
                </View>
                <View style={styles.flexOne}>
                  <Input
                    label="Ano"
                    // defaultValue={`${formState.due_date?.getFullYear() || ""}`}
                    onChange={onChangeDateWeb("due_date", "year")}
                    error={Boolean(webDateErrors.get("year"))}
                    keyboardType="numeric"
                    inputMode="decimal"
                  />
                  {Boolean(webDateErrors.get("year")) && (
                    <Text type="error">{webDateErrors.get("year")}</Text>
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
          <Button variant="contained" onPress={onSubmit} color={"black"}>
            Salvar
          </Button>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
