import { View } from "react-native";

type SpacerProps = {
  horizontal?: number;
  vertical?: number;
  flex?: number;
};

export const Spacer = (props: SpacerProps) => {
  const { horizontal, vertical, flex } = props;
  const width = flex || horizontal;
  const height = vertical;

  return <View style={{ width, height, flex }} />;
};
