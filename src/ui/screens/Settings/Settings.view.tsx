import { SafeAreaView, Switch, View } from "react-native";
import { Button, Text } from "@ui/components/UIComponents";
import { NavigationHeader } from "@ui/components/NavigationHeader/NavigationHeader.view";

export function SettingsView({
  signout,
  migrate,
  darkMode,
  toggleTheme,
  isDark,
}) {
  return (
    <SafeAreaView
      className={`flex flex-1 min-h-full  ${isDark(
        "bg-dark-background",
        "bg-background"
      )}`}
    >
      <NavigationHeader title="Settings" />
      <View className="mx-5 gap-y-3">
        <Button onPress={migrate}>Migrar para nuvem</Button>
        <Button onPress={signout}>Sair</Button>
        <View className="flex flex-row items-center justify-between">
          <Text>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={toggleTheme} />
        </View>
      </View>
    </SafeAreaView>
  );
}
