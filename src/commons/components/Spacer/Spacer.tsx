import { View } from "react-native";

type SpacerProps = {
  x?: number;
  y?: number;
  flex?: number;
};

export const Spacer = ({ flex, x, y }: SpacerProps) => {
  return <View style={{ width: x || flex, height: y, flex: flex }} />;
};
