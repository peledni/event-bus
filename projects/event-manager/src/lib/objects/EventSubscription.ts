export class EventSubscription<T> {
  id: number;
  callbackFunction: (eventData: T) => void;

  constructor(id: number, callbackFunction: (eventData: T) => void) {
    this.id = id;
    this.callbackFunction = callbackFunction;
  }
}
