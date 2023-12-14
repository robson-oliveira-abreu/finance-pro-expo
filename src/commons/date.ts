export function getLocaleDate(value: string | number | Date): string {
  return new Date(value)?.toLocaleDateString("pt-BR", {
    dateStyle: "medium",
  });
}
