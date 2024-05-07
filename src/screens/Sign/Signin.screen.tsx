import React from "react";
import { View } from "react-native";
import { Input } from "../../commons/components/Input/Input";
import { Spacer } from "../../commons/components/Spacer/Spacer";
import { useWidth } from "../../commons/Hooks/useWidth.hook";
import { Button, Text } from "../../commons/components/UIComponents";
import { useAuth } from "../../commons/Hooks/useAuth/useAuth.hook";
import { styles } from "./styles";
import { Props } from "./types";

type Labels = "email" | "password";

type FormState = {
  [label in Labels]: string;
};

const initialState: FormState = {
  email: "",
  password: "",
};

export function Signin({ navigation }: Props) {
  const [form, setForm] = React.useState(initialState);
  const { maxWidth } = useWidth();
  const { signin, loading } = useAuth();

  const onChangeForm = (label: Labels) => {
    return (text: string) => {
      setForm((prev) => ({ ...prev, [label]: text }));
    };
  };

  const goToSignup = () => {
    navigation.navigate("Signup");
  };

  const onSubmit = () => {
    signin?.(form.email, form.password);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.content, { width: maxWidth(560) }]}>
        <Text variant="titleLarge">Login</Text>

        <Input
          label={"Email"}
          value={form.email}
          onChange={onChangeForm("email")}
        />

        <Input
          label={"Senha"}
          value={form.password}
          onChange={onChangeForm("password")}
          type="password"
        />

        <Spacer y={8} />

        <Button
          variant="contained"
          style={styles.button}
          onPress={onSubmit}
          loading={loading}
          disabled={loading}
        >
          Entrar
        </Button>

        <Button
          variant="text"
          style={styles.button}
          onPress={goToSignup}
          loading={loading}
          disabled={loading}
        >
          Cadastro
        </Button>
      </View>
    </View>
  );
}
