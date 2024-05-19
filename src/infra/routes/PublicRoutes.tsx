import { createStackNavigator } from "@react-navigation/stack";

export type PublicRootStackParamList = {
  Signin: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

const Stack = createStackNavigator<PublicRootStackParamList>();

export function PublicStackRoutes({ SigninScreen, SignupScreen }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={SigninScreen} />
    </Stack.Navigator>
  );
}
