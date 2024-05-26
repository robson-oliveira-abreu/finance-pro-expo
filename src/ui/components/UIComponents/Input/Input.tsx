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
  TextInputProps,
} from "react-native";
import { isWeb } from "@application/utils/platform";
import { Spacer } from "@ui/components/Spacer/Spacer";
import { useTheme } from "@application/Hooks/useTheme";
import { darkColorsTheme } from "@infra/theme/dark.colors.theme";
import { lightColorsTheme } from "@infra/theme/light.colors.theme";

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
  placeholder?: string;
} & Omit<TextInputProps, "onChange">;

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
  const theme = useTheme();
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
    ...rest
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
      { borderRadius: border_radius[radius] },
    ];

    if (status === "focused")
      _styles.push(
        focusColor
          ? { borderColor: focusColor }
          : { borderColor: darkColorsTheme.main }
      );

    if (errorMessage) _styles.push(styles.error);

    return _styles;
  };

  return (
    <View className="w-full">
      {!!label && (
        <Text
          className={`pl-2 text-xs mb-1  ${theme.isDark(
            "text-dark-textSecondary",
            "text-textSecondary"
          )}`}
          style={[labelStyle]}
        >
          {label}:
        </Text>
      )}
      <View
        className={`
        w-full flex-row items-center border-2 rounded-lg py-2 px-3
        ${theme.isDark(
          "bg-dark-backgroundSecondary border-dark-backgroundSecondary",
          "bg-backgroundSecondary border-backgroundSecondary"
        )}`}
        style={[handleContentStyles(), style]}
      >
        {props.left ? (
          <>
            {props.left}
            <Spacer x={4} />
          </>
        ) : null}

        <TextInput
          className={`${theme.isDark("text-dark-text", "text-text")}`}
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
          placeholder={props.placeholder}
          placeholderTextColor={theme.isDark(
            darkColorsTheme.textInfo,
            lightColorsTheme.textInfo
          )}
          {...rest}
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
  errorMessage: {
    paddingLeft: 8,
    fontSize: 10,
    color: "red",
  },
  error: {
    borderColor: "#ff0000",
  },
  input: {
    borderWidth: 0,
    width: "100%",
    lineHeight: 16,
  },
});
