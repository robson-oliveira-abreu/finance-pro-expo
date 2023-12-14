import { Platform } from "react-native";

export const isPlatform = (platform: typeof Platform.OS) => {
  return Platform.OS === platform;
};

const isWeb = isPlatform("web");
const isIos = isPlatform("ios");
const isAndroid = isPlatform("android");

export { isWeb, isIos, isAndroid };
