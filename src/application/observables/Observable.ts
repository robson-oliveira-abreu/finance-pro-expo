type Observer<NotifyProps> = (props?: NotifyProps) => void;

export abstract class Observable<NotifyProps = undefined> {
  private _observers = new Map<string, Observer<NotifyProps>>();
  private nextId = 0;

  public get observers() {
    return this._observers;
  }

  private getLastId(): string {
    return this.nextId.toString();
  }

  public subscribe(observer: Observer<NotifyProps>) {
    const id = this.getLastId();

    this._observers.set(id, observer);

    this.nextId++;

    return {
      unsubscribe: () => this.unsubscribe(id),
      subscription: id,
    };
  }

  public unsubscribe(id: string) {
    this._observers.delete(id);
  }

  public notify(props?: NotifyProps): void {
    this._observers.forEach((observer) => {
      observer(props);
    });
  }
}
