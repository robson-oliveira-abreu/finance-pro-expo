import React from "react";
import { View } from "react-native";
import { Input } from "@ui/components/UIComponents/Input/Input";
import { Spacer } from "@ui/components/Spacer/Spacer";
import { useWidth } from "@application/Hooks/useWidth.hook";
import { Button, Text } from "@ui/components/UIComponents";
import { useAuth } from "@application/Hooks/useAuth/useAuth.hook";
import { styles } from "./styles";
import { Props } from "./types";
import { Container } from "@ui/components/Container/Container";

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
    <Container className="justify-center items-center max-w-xl">
      <Text variant="titleLarge">SignIn</Text>

      <Spacer y={12} />

      <Input
        label={"Email"}
        value={form.email}
        onChange={onChangeForm("email")}
        keyboardType="email-address"
        inputMode="email"
        placeholder="email@email.com"
        autoCapitalize="none"
      />

      <Spacer y={12} />

      <Input
        label={"Senha"}
        value={form.password}
        onChange={onChangeForm("password")}
        type="password"
        inputMode="text"
        keyboardType="default"
        placeholder="******"
        autoCapitalize="none"
      />

      <Spacer y={20} />

      <Button
        variant="contained"
        style={styles.button}
        onPress={onSubmit}
        loading={loading}
        disabled={loading}
      >
        Entrar
      </Button>

      <Spacer y={12} />

      <Button
        variant="text"
        style={styles.button}
        onPress={goToSignup}
        loading={loading}
        disabled={loading}
      >
        Cadastro
      </Button>
    </Container>
  );
}
