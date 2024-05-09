import { View } from "react-native";
import { Button } from "../../commons/components/UIComponents";
import { SettingsView } from "./Settings.view";
import { useExpenses } from "../../commons/Hooks/useExpenses.hook";

export function SettingsModelView() {
  const { handleUseHttp, useHttp } = useExpenses();
  return <SettingsView handleUseHttp={handleUseHttp} useHttp={useHttp} />;
}
