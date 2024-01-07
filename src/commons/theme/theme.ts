import { MD3LightTheme } from "react-native-paper";

export const theme: typeof MD3LightTheme = {
  ...MD3LightTheme,
  mode: "adaptive",
  colors: {
    ...MD3LightTheme.colors,
    primary: "#fa3c23",
    surface: "#000",
  },
};
