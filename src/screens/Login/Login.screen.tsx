import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, FAB, TextInput, Text } from "react-native-paper";
import { Spacer } from "../../components/Spacer/Spacer";
import { useDialog } from "../../commons/Hooks/useDialog.hook";
import { useWidth } from "../../commons/Hooks/useWidth";

type Labels = "email" | "password";

type FormState = {
  [label in Labels]: string;
};

const initialState: FormState = {
  email: "",
  password: "",
};

export default function Login() {
  const [state, setState] = React.useState({ open: false });
  const [form, setForm] = React.useState(initialState);
  const { Alert, closeAlert } = useDialog();
  const { maxWidth } = useWidth();

  const onStateChange = ({ open }) => setState({ open });

  const handleActions = () => {
    return [
      { icon: "plus", onPress: () => console.log("Pressed add") },
      {
        icon: "star",
        label: "Star",
        onPress: () => console.log("Pressed star"),
      },
      {
        icon: "email",
        label: "Email",
        onPress: () => console.log("Pressed email"),
      },
      {
        icon: "bell",
        label: "Remind",
        onPress: () => console.log("Pressed notifications"),
      },
    ];
  };

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
    Alert({
      title: "Submit",
      message: alert_text,
      actions: [{ label: "OK", onPress: closeAlert }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.content, { width: maxWidth(560) }]}>
        <Text variant="titleSmall">LOGIN</Text>

        <TextInput
          label={"Email"}
          style={styles.input}
          value={form.email}
          onChangeText={onChangeForm("email")}
        />

        <TextInput
          label={"Senha"}
          style={styles.input}
          value={form.password}
          secureTextEntry
          onChangeText={onChangeForm("password")}
        />

        <Spacer vertical={8} />

        <Button mode="contained" style={styles.button} onPress={onSubmit}>
          Entrar
        </Button>

        <Button mode="text" style={styles.button} onPress={clearFields}>
          Limpar
        </Button>

        <FAB.Group
          visible
          open={state.open}
          onStateChange={onStateChange}
          actions={handleActions()}
          icon="plus"
          onPress={() => console.log("Pressed")}
        />
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
