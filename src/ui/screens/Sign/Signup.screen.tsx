import React from "react";
import { View } from "react-native";
import { Input } from "@ui/components/UIComponents/Input/Input";
import { Spacer } from "@ui/components/Spacer/Spacer";
import { useWidth } from "src/application/Hooks/useWidth.hook";
import { Button, Text } from "@ui/components/UIComponents";
import { useAuth } from "src/application/Hooks/useAuth/useAuth.hook";
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
    signup?.(form.email, form.password, form.name);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.content, { width: maxWidth(560) }]}>
        <Text variant="titleLarge">Cadastro</Text>

        <Input
          label={"Nome"}
          value={form.name}
          onChange={onChangeForm("name")}
          keyboardType="default"
          inputMode="text"
          placeholder="Nome"
        />

        <Input
          label={"Email"}
          value={form.email}
          onChange={onChangeForm("email")}
          type="email"
          keyboardType="email-address"
          inputMode="email"
          placeholder="email@email.com"
        />

        <Input
          label={"Senha"}
          value={form.password}
          onChange={onChangeForm("password")}
          type="password"
          keyboardType="default"
          inputMode="text"
          placeholder="******"
        />

        <Input
          label={"Confirmar Senha"}
          value={form.confirmPassword}
          onChange={onChangeForm("confirmPassword")}
          type="password"
          keyboardType="default"
          inputMode="text"
          placeholder="******"
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
