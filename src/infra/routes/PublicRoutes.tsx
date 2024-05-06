import { createStackNavigator } from "@react-navigation/stack";
import { Signin } from "../../screens/Signin/Singin.screen";

export type RootStackParamList = {
  Signin: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export function PublicStackRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signin} />
      <Stack.Screen name="ForgotPassword" component={Signin} />
    </Stack.Navigator>
  );
}
