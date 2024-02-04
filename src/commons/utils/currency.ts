export function currency(value: number): string {
  const total = (value / 100)?.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return Number(value) ? total : "R$ -";
}
