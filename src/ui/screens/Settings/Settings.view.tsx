import { SafeAreaView, View } from "react-native";
import { Button } from "@ui/components/UIComponents";
import { NavigationHeader } from "@ui/components/NavigationHeader/NavigationHeader.view";

export function SettingsView({ signout, migrate }) {
  return (
    <SafeAreaView style={{ flex: 1, minHeight: "100%" }}>
      <NavigationHeader title="Settings" />
      <View style={{ marginHorizontal: 20, gap: 12 }}>
        <Button onPress={migrate}>Migrar para nuvem</Button>
        <Button onPress={signout}>Sair</Button>
      </View>
    </SafeAreaView>
  );
}
