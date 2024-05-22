import { PropsWithChildren } from "react";

export function WithCondition({
  condition,
  children,
}: { condition: boolean } & PropsWithChildren) {
  return condition ? children : null;
}
