import { SafeAreaView, View } from "react-native";
import { Button, Text } from "../../components/UIComponents";
import { NavigationHeader } from "../../components/NavigationHeader/NavigationHeader.view";

export function SettingsView({ signout, migrate }) {
  return (
    <SafeAreaView style={{ flex: 1, minHeight: "100%" }}>
      <NavigationHeader title="Settings" />
      <View style={{ marginHorizontal: 20 }}>
        <Button onPress={migrate}>Migrar para nuvem</Button>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>User servicos http</Text>
        </View>
        <Button onPress={signout}>Sair</Button>
      </View>
    </SafeAreaView>
  );
}
