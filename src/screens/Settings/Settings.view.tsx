import { SafeAreaView, View } from "react-native";
import { Button } from "../../commons/components/UIComponents";

export function SettingsView() {
  return (
    <SafeAreaView style={{ flex: 1, minHeight: "100%" }}>
      <View style={{ marginHorizontal: 20 }}>
        <Button onPress={() => {}}>Migrate</Button>
      </View>
    </SafeAreaView>
  );
}
