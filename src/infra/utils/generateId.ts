export function generateId(): string {
  const random = Math.random;

  const random_id = `${random()}-${random()}-${random()}`;

  return random_id.replaceAll(".", "");
}
