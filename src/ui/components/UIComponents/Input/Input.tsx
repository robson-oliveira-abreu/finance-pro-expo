import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ColorValue,
  KeyboardTypeOptions,
  InputModeOptions,
} from "react-native";
import { theme } from "@ui/theme/theme";
import { isWeb } from "@infra/utils/platform";
import { Spacer } from "@ui/components/Spacer/Spacer";

type Props = {
  value?: string;
  onChange?: (text: string) => void;
  label?: string;
  error?: string | boolean;
  type?: "email" | "password";
  minLength?: number;
  maxLength?: number;
  radius?: "none" | "sm" | "md" | "lg" | "xl" | "rounded";
  labelStyle?: StyleProp<TextStyle>;
  style?: StyleProp<TextStyle>;
  errorMessageStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  focusColor?: ColorValue;
  keyboardType?: KeyboardTypeOptions;
  defaultValue?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  inputMode?: InputModeOptions | undefined;
};

const border_radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  rounded: 100,
};

export function Input(props: Props) {
  const inputRef = useRef<TextInput>(null);
  const [errors, setErrors] = useState({
    email: "",
    minLength: "",
    maxLength: "",
  });

  const [status, setStatus] = useState("unfocused");
  const {
    value,
    onChange,
    label,
    type,
    radius = "md",
    minLength,
    maxLength,
    labelStyle,
    style,
    errorMessageStyle,
    disabled,
    focusColor,
    inputMode,
    keyboardType,
    defaultValue,
  } = props;

  const errorMessage =
    Object.values(errors).find((error) => error) || props?.error;

  const handleFocused = (e) => {
    if (disabled) {
      inputRef.current?.blur();
      return;
    }

    setStatus("focused");
  };

  const handleBlur = () => {
    setStatus("unfocused");
  };

  const validateEmail = (_text: string) => {
    if (!(_text.includes("@") && _text.split("@")[1].includes(".com"))) {
      setErrors((prev) => ({ ...prev, email: "email invalido!" }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const validateLength = (_text: string) => {
    if (minLength && _text.length < minLength) {
      setErrors((prev) => ({
        ...prev,
        minLength: `deve conter pelo menos ${minLength} caracteres`,
      }));
    } else {
      setErrors((prev) => ({ ...prev, minLength: "" }));
    }

    if (maxLength && _text.length > maxLength) {
      setErrors((prev) => ({
        ...prev,
        maxLength: `deve conter no maximo ${maxLength} caracteres`,
      }));
    } else {
      setErrors((prev) => ({ ...prev, maxLength: "" }));
    }
  };

  const handleChange = (_text: string) => {
    if (disabled) return;

    if (type === "email") validateEmail(_text);
    if (minLength || maxLength) validateLength(_text);

    onChange?.(_text);
  };

  const handleContentStyles = () => {
    const _styles: StyleProp<ViewStyle> = [
      styles.content,
      { borderRadius: border_radius[radius] },
    ];

    if (status === "focused")
      _styles.push(focusColor ? { borderColor: focusColor } : styles.focus);

    if (errorMessage) _styles.push(styles.error);

    return _styles;
  };

  return (
    <View style={styles.container}>
      {!!label && <Text style={[styles.label, labelStyle]}>{label}:</Text>}
      <View style={[handleContentStyles(), style]}>
        {Boolean(props.left) && (
          <>
            {props.left}
            <Spacer x={4} />
          </>
        )}

        <TextInput
          style={[styles.input, isWeb && ({ outline: 0 } as any)]}
          keyboardType={keyboardType}
          ref={inputRef}
          onFocus={handleFocused}
          onBlur={handleBlur}
          value={value}
          onChangeText={handleChange}
          secureTextEntry={type === "password"}
          inputMode={inputMode}
          defaultValue={defaultValue}
        />

        {Boolean(props.right) && (
          <>
            <Spacer x={4} />
            {props.right}
          </>
        )}
      </View>
      {!!errorMessage && (
        <Text style={[styles.errorMessage, errorMessageStyle]}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  content: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#d1d1d1",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  errorMessage: {
    paddingLeft: 8,
    fontSize: 10,
    color: "red",
  },
  focus: {
    borderColor: "#0050ff",
  },
  error: {
    borderColor: "#ff0000",
  },
  label: {
    paddingLeft: 8,
    fontSize: 10,
    color: theme.colors.shapeDark,
    marginBottom: 4,
  },
  input: {
    borderWidth: 0,
    width: "100%",
    lineHeight: 16,
  },
});
