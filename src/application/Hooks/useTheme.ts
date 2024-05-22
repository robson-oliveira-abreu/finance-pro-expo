import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { ThemeLocalService } from "../services/local/ThemeLocalService";

export function useTheme() {
  const themeLocalService = new ThemeLocalService();
  const { colorScheme, toggleColorScheme, setColorScheme } = useColorScheme();

  const darkMode = colorScheme === "dark";

  function dark(classes: string) {
    return darkMode ? classes : "";
  }

  function isDark(darkClasses: string, lightClasses: string) {
    if (darkMode) return darkClasses;

    return lightClasses;
  }

  function toggleTheme() {
    themeLocalService.set(darkMode ? "light" : "dark");

    toggleColorScheme();
  }

  async function loadTheme() {
    const theme = await themeLocalService.get();

    if (theme.success && theme.payload) {
      setColorScheme(theme.payload);
    }
  }

  useEffect(() => {
    loadTheme();
  }, []);

  return { dark, darkMode, isDark, toggleTheme };
}
