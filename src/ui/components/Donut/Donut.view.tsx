import { View } from "react-native";
import { Circle, G, Svg } from "react-native-svg";
import { Text } from "../UIComponents";
import { styles } from "./styles";

export function DonutView({
  target,
  value,
  color = "#f12333",
  centerText = "R$ 150",
}) {
  const radius = 40;
  const circleCircumference = 2 * Math.PI * radius;
  const percentage = (value / target) * 100;
  const strokeDashoffset =
    circleCircumference - (circleCircumference * percentage) / 100;

  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" viewBox="0 0 100 100">
        <G rotation={-90} originX="50" originY="50">
          <Circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#46464680"
            strokeWidth="12"
            fill="transparent"
          />

          <Circle
            cx="50"
            cy="50"
            r={radius}
            stroke={color}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circleCircumference || 0}
            strokeDashoffset={strokeDashoffset || 0}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <Text variant="bodySmall" style={styles.text}>
        {centerText}
      </Text>
    </View>
  );
}
