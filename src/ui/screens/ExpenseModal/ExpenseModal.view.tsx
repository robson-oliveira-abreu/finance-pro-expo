import { Modal, TouchableOpacity, View } from "react-native";
import { Spacer } from "@ui/components/Spacer/Spacer";
import { Text } from "@ui/components/UIComponents/Text";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { getLocaleDate } from "@application/utils/date";
import { isAndroid, isIos, isWeb } from "@application/utils/platform";
import { AddExpenseModalViewProps } from "./common/types";
import { KeyboardAvoidingView } from "@ui/components/KeyboardAvoidingView/KeyboardAvoidingView.view";
import { Button } from "@ui/components/UIComponents";
import { Input } from "@ui/components/UIComponents/Input/Input";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SegmentedButton } from "@ui/components/UIComponents/SegmentedButton/SegmentedButton";
import { expenseTypeOptions } from "./common/constants";
import { theme } from "@infra/theme/theme";
import { Container } from "@ui/components/Container/Container";
import { useTheme } from "@application/Hooks/useTheme";
import { darkColorsTheme } from "@infra/theme/dark.colors.theme";
import { lightColorsTheme } from "@infra/theme/light.colors.theme";
import { WithCondition } from "@ui/components/WithCondition/WithCondition";
import { Label } from "@ui/components/UIComponents/Label";

export function ExpenseModalView(props: AddExpenseModalViewProps) {
  const {
    type,
    onClose,
    open,
    errors,
    webDate,
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
  const { isDark } = useTheme();

  return (
    <Modal visible={open} onRequestClose={onClose}>
      <KeyboardAvoidingView>
        <Container>
          <TouchableOpacity
            onPress={onClose}
            className="w-8 h-8 items-center justify-center"
          >
            <Ionicons
              name="close"
              size={28}
              color={isDark(darkColorsTheme.text, lightColorsTheme.text)}
            />
          </TouchableOpacity>

          <Spacer y={12} />

          <SegmentedButton
            options={expenseTypeOptions}
            onSelect={onChangeType}
          />

          <Spacer y={12} />

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

          <Spacer y={12} />

          <View>
            <Input
              label="Valor"
              value={formState.amount?.toString()}
              onChange={onChange("amount")}
              keyboardType="decimal-pad"
              inputMode="decimal"
              left={() => <Text>$</Text>}
              error={!!errors.get("amount")}
            />
            {!!errors.get("amount") && errors.get("amount") && (
              <Text type="error">{errors.get("amount")}</Text>
            )}
          </View>

          <Spacer y={12} />

          <View>
            <Input
              label="Observação"
              value={formState.observation}
              onChange={onChange("observation")}
              keyboardType="default"
              inputMode="text"
            />
          </View>

          <WithCondition condition={type === "fixed"}>
            <Spacer y={12} />
            <View>
              <Input
                label="1º Parcela"
                value={formState.installment}
                onChange={onChange("installment")}
                keyboardType="numeric"
                inputMode="decimal"
              />
            </View>
          </WithCondition>

          <WithCondition condition={type === "fixed"}>
            <Spacer y={12} />
            <View>
              <Input
                label="Qtd. Parcelas"
                value={formState.installments}
                onChange={onChange("installments")}
                right={() => <Text variant="bodySmall">vezes</Text>}
                keyboardType="numeric"
                inputMode="decimal"
              />
            </View>
          </WithCondition>

          <View>
            <Spacer y={12} />

            <Label>
              {props.type === "expense"
                ? "Data da despesa:"
                : "Data de Vencimento:"}
            </Label>

            <Spacer y={4} />

            {isWeb && (
              <View className="flex-row w-full gap-2">
                <View className="flex-1">
                  <Input
                    label="Dia"
                    value={String(webDate.due_date?.day)}
                    onChange={onChangeDateWeb("due_date", "day")}
                    error={Boolean(webDateErrors.get("day"))}
                    keyboardType="numeric"
                    inputMode="decimal"
                  />
                  {Boolean(webDateErrors.get("day")) && (
                    <Text type="error">{webDateErrors.get("day")}</Text>
                  )}
                </View>
                <View className="flex-1">
                  <Input
                    label="Mês"
                    value={String(webDate.due_date?.month)}
                    onChange={onChangeDateWeb("due_date", "month")}
                    error={Boolean(webDateErrors.get("month"))}
                    keyboardType="numeric"
                    inputMode="decimal"
                  />
                  {Boolean(webDateErrors.get("month")) && (
                    <Text type="error">{webDateErrors.get("month")}</Text>
                  )}
                </View>
                <View className="flex-1">
                  <Input
                    label="Ano"
                    value={String(webDate.due_date?.year)}
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
          <Button variant="contained" onPress={onSubmit}>
            Salvar
          </Button>
        </Container>
      </KeyboardAvoidingView>
    </Modal>
  );
}
