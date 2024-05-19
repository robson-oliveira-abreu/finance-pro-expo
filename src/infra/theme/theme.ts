import { darkColorsTheme } from "./dark.colors.theme";
import { lightColorsTheme } from "./light.colors.theme";

export const theme = {
  colors: {
    shape: "#FFFFFF",
    shapeSecondary: "#DFDFDF",
    shapeDark: "#222222",
    shapeDarkSecondary: "#333333",
    danger: "#FF3939",
    success: "#61ED5E",
    warn: "#FC784F",
    ...darkColorsTheme,
  },
};
