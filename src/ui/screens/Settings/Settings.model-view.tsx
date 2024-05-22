import { SettingsView } from "./Settings.view";
import { useExpenses } from "src/application/Hooks/useExpenses/useExpenses.hook";
import { useAuth } from "src/application/Hooks/useAuth/useAuth.hook";
import { useColorScheme } from "nativewind";
import { useTheme } from "@/application/Hooks/useTheme";

export function SettingsModelView() {
  const { migrate } = useExpenses();
  const { signout } = useAuth();
  const { isDark, darkMode, toggleTheme } = useTheme();

  return (
    <SettingsView
      signout={signout}
      migrate={migrate}
      darkMode={darkMode}
      toggleTheme={toggleTheme}
      isDark={isDark}
    />
  );
}
