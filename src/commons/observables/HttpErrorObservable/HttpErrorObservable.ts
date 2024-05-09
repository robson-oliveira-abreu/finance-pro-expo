import { Observable } from "../Observable";

export type NotifyProps = {
  status: number;
};

export class HttpErrorObservable extends Observable<NotifyProps> {}

export default new HttpErrorObservable();
