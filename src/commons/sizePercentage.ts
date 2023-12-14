import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const widthPercentage = (percentage: number) => {
  const onePercent = width / 100;
  return Math.floor(onePercent * percentage);
};

export const heightPercentage = (percentage: number) => {
  const onePercent = height / 100;
  return Math.floor(onePercent * percentage);
};
