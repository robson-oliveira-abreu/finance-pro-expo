import {
  Keyboard,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  TouchableWithoutFeedback,
} from "react-native";
import { isWeb } from "@application/utils/platform";

function KeyboardAvoidingView(props: KeyboardAvoidingViewProps) {
  const onPress = () => !isWeb && Keyboard.dismiss();
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <RNKeyboardAvoidingView
        className={`${props.className} flex flex-1`}
        behavior="padding"
      >
        {props.children}
      </RNKeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export { KeyboardAvoidingView };
