import React from "react";
import { StyleSheet, View } from "react-native";
import { Input } from "../../commons/components/Input/Input";
import { Spacer } from "../../commons/components/Spacer/Spacer";
import { useDialog } from "../../commons/Hooks/useDialog.hook";
import { useWidth } from "../../commons/Hooks/useWidth.hook";
import { Button, Text } from "../../commons/components/UIComponents";

type Labels = "email" | "password";

type FormState = {
  [label in Labels]: string;
};

const initialState: FormState = {
  email: "",
  password: "",
};

export function Login() {
  const [form, setForm] = React.useState(initialState);
  const dialog = useDialog();
  const { maxWidth } = useWidth();

  const onChangeForm = (label: Labels) => {
    return (text: string) => {
      setForm((prev) => ({ ...prev, [label]: text }));
    };
  };

  const clearFields = () => {
    setForm(initialState);
  };

  const onSubmit = () => {
    const alert_text = Object.entries(form).reduce(
      (text, [label, value]) => (text += `${label}: ${value}; \n`),
      ""
    );
    dialog?.Alert({
      title: "Submit",
      message: alert_text,
      actions: [{ label: "OK", onPress: dialog.closeAlert }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.content, { width: maxWidth(560) }]}>
        <Text variant="titleSmall">LOGIN</Text>

        <Input
          label={"Email"}
          style={styles.input}
          value={form.email}
          onChange={onChangeForm("email")}
        />

        <Input
          label={"Senha"}
          style={styles.input}
          value={form.password}
          onChange={onChangeForm("password")}
          type="password"
        />

        <Spacer y={8} />

        <Button variant="contained" style={styles.button} onPress={onSubmit}>
          Entrar
        </Button>

        <Button variant="text" style={styles.button} onPress={clearFields}>
          Limpar
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    gap: 12,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "100%",
  },
  button: {
    width: "100%",
    borderRadius: 8,
  },
});
