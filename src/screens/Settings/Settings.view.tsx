import { SafeAreaView, Switch, View } from "react-native";
import { Button, Text } from "../../commons/components/UIComponents";
import { NavigationHeader } from "../../commons/components/NavigationHeader/NavigationHeader.view";

export function SettingsView({ handleUseHttp, useHttp }) {
  return (
    <SafeAreaView style={{ flex: 1, minHeight: "100%" }}>
      <NavigationHeader title="Settings" />
      <View style={{ marginHorizontal: 20 }}>
        <Button onPress={() => {}}>Migrar para nuvem</Button>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>User servicos http</Text>
          <Switch value={useHttp} onValueChange={handleUseHttp} />
        </View>
      </View>
    </SafeAreaView>
  );
}
