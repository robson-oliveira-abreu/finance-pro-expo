export class Success<Payload> {
  success: true = true;

  constructor(public payload: Payload) {}
}
