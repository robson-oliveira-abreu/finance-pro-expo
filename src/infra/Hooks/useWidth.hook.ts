import { useWindowDimensions } from "react-native";

export const useWidth = () => {
  const { width } = useWindowDimensions();

  const maxWidth = (max_width: number) => {
    if (max_width < width) {
      return max_width;
    } else {
      return "100%";
    }
  };

  return {
    maxWidth,
  };
};
