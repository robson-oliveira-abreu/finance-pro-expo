import React from "react";
import { View } from "react-native";
import { Input } from "../../components/UIComponents/Input/Input";
import { Spacer } from "../../components/Spacer/Spacer";
import { useWidth } from "../../../infra/Hooks/useWidth.hook";
import { Button, Text } from "../../components/UIComponents";
import { useAuth } from "../../../infra/Hooks/useAuth/useAuth.hook";
import { styles } from "./styles";
import { Props } from "./types";

type Labels = "email" | "password" | "name" | "confirmPassword";

type FormState = {
  [label in Labels]: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export function Signup({ navigation }: Props) {
  const [form, setForm] = React.useState(initialState);
  const { maxWidth } = useWidth();
  const { signup, loading } = useAuth();

  const onChangeForm = (label: Labels) => {
    return (text: string) => {
      setForm((prev) => ({ ...prev, [label]: text }));
    };
  };

  const goToSingin = () => {
    navigation.navigate("Signin");
  };

  const onSubmit = () => {
    //signup?.(form.email, form.password, form.name);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.content, { width: maxWidth(560) }]}>
        <Text variant="titleLarge">Cadastro</Text>

        <Input
          label={"Nome"}
          value={form.name}
          onChange={onChangeForm("email")}
        />

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

        <Input
          label={"Confirmar Senha"}
          value={form.confirmPassword}
          onChange={onChangeForm("confirmPassword")}
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
          Cadastrar
        </Button>

        <Button
          variant="text"
          style={styles.button}
          onPress={goToSingin}
          loading={loading}
          disabled={loading}
        >
          Entrar
        </Button>
      </View>
    </View>
  );
}
