export class Failure {
  success = false as const;

  constructor(public errorMessage?: string) {}
}
