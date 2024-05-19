import { SettingsView } from "./Settings.view";
import { useExpenses } from "src/application/Hooks/useExpenses/useExpenses.hook";
import { useAuth } from "src/application/Hooks/useAuth/useAuth.hook";

export function SettingsModelView() {
  const { migrate } = useExpenses();
  const { signout } = useAuth();
  return <SettingsView signout={signout} migrate={migrate} />;
}
