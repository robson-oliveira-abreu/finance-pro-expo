export class Failure {
  success = false as const;

  constructor(public message?: string) {}
}
