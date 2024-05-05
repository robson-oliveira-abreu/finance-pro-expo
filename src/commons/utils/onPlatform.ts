import { Platform } from "react-native";
import { isPlatform } from "./platform";

export function onPlatform(platform: typeof Platform.OS, callback: Function) {
  if (isPlatform(platform)) {
    callback?.();
  }
}
