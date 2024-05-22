import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "@ui/components/UIComponents/Text";
import { useState } from "react";
import { useTheme } from "@/application/Hooks/useTheme";

export type Option = {
  label: string;
  value: string;
};

type SegmentedButtonProps = {
  options: Option[];
  onSelect: (value: string) => void;
};

const RADIUS = 16;

export function SegmentedButton(props: SegmentedButtonProps) {
  const { options } = props;
  const [selected, setSelected] = useState(props.options.at(0)?.value);
  const { isDark } = useTheme();

  function onSelect(item: Option) {
    return () => {
      setSelected(item.value);
      props.onSelect(item.value);
    };
  }

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={option.value}
          className={`${
            selected === option.value
              ? "border-main bg-main"
              : isDark(
                  "border-dark-backgroundSecondary",
                  "border-backgroundSecondary"
                )
          }`}
          style={[
            styles.option,
            index === 0 && styles.firstOption,
            index === options.length - 1 && styles.lastOption,
          ]}
          onPress={onSelect(option)}
        >
          <Text
            variant="titleSmall"
            className={`${selected === option.value ? "text-shape" : ""}`}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: RADIUS,
    overflow: "hidden",
  },
  option: {
    flex: 1,
    borderWidth: 2,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  firstOption: {
    borderTopLeftRadius: RADIUS,
    borderBottomLeftRadius: RADIUS,
    borderLeftWidth: 2,
  },
  lastOption: {
    borderTopRightRadius: RADIUS,
    borderBottomRightRadius: RADIUS,
    borderRightWidth: 2,
  },
});
