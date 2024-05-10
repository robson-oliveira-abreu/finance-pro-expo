import HttpErrorObservableInstance, {
  HttpErrorObservable,
  NotifyProps,
} from "./HttpErrorObservable";

type Subscriber = (props: NotifyProps) => void;

export class SubscribeHttpErrorObserver {
  private subscription: string;
  private httpErrorObservable: HttpErrorObservable;

  constructor(subscriber: Subscriber) {
    this.httpErrorObservable = HttpErrorObservableInstance;

    const { subscription } = this.httpErrorObservable.subscribe(subscriber);

    this.subscription = subscription;
  }

  unsubscribe() {
    this.httpErrorObservable.unsubscribe(this.subscription);
  }
}
