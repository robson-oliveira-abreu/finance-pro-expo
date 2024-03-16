import { Text } from "react-native-paper";
import { TextViewProps } from "./types";

function TextView(props: TextViewProps) {
  const { children, variant, ...rest } = props;

  return (
    <Text variant={variant} {...rest}>
      {children}
    </Text>
  );
}

export { TextView };
