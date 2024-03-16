import { Text } from "../../../../commons/components/UIComponents";

export function RowData({ label, value }: { label: string; value: string }) {
  return (
    <>
      <Text variant="bodyLarge" style={{ fontWeight: "700" }}>
        {label}
      </Text>
      <Text variant="bodyLarge" style={{ paddingLeft: 12 }}>
        {value}
      </Text>
    </>
  );
}
