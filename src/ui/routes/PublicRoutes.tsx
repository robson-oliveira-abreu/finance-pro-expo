import { createStackNavigator } from "@react-navigation/stack";
import { Signin } from "../screens/Sign/Signin.screen";
import { Signup } from "../screens/Sign/Signup.screen";

export type PublicRootStackParamList = {
  Signin: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

const Stack = createStackNavigator<PublicRootStackParamList>();

export function PublicStackRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={Signin} />
    </Stack.Navigator>
  );
}
