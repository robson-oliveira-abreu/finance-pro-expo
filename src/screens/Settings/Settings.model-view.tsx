import { SettingsView } from "./Settings.view";
import { useExpenses } from "../../commons/Hooks/useExpenses.hook";
import { useAuth } from "../../commons/Hooks/useAuth/useAuth.hook";

export function SettingsModelView() {
  const { handleUseHttp, useHttp } = useExpenses();
  const { signout } = useAuth();
  return (
    <SettingsView
      handleUseHttp={handleUseHttp}
      useHttp={useHttp}
      signout={signout}
    />
  );
}
