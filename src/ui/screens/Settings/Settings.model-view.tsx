import { SettingsView } from "./Settings.view";
import { useExpenses } from "../../../infra/Hooks/useExpenses/useExpenses.hook";
import { useAuth } from "../../../infra/Hooks/useAuth/useAuth.hook";

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
