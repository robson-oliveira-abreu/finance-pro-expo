import {
  Keyboard,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native";
import { isWeb } from "@infra/utils/platform";
import { PropsWithChildren } from "react";

type KeyboardAvoidingViewProps = PropsWithChildren & {
  style?: ViewStyle;
};

function KeyboardAvoidingView(props: KeyboardAvoidingViewProps) {
  const onPress = () => !isWeb && Keyboard.dismiss();
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <RNKeyboardAvoidingView
        style={[{ flex: 1 }, props.style]}
        behavior="padding"
      >
        {props.children}
      </RNKeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export { KeyboardAvoidingView };
