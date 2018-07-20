import {Injectable} from '@angular/core';
import {EventSubscription} from './objects/EventSubscription';

@Injectable({
  providedIn: 'root'
})
export class EventManagerService {
  private _eventNameToSubscriptionMap: Map<string, Array<EventSubscription<any>>> = new Map<string, Array<EventSubscription<any>>>();
  private _eventSubscriptionIdToEventNameMap: Map<number, string> = new Map<number, string>();
  private _eventSubscriptionId = 0;

  public subscribe<T>(eventName: string, callbackFunction: (eventData: T) => void): number {
    if (!eventName || eventName.trim() === '') {
      throw new Error('invalid eventName');
    }
    if (typeof callbackFunction !== 'function') {
      throw new Error('invalid callbackFunction');
    }
    if (!this._eventNameToSubscriptionMap.has(eventName)) {
      this._eventNameToSubscriptionMap.set(eventName, []);
    }
    const eventSubscriptionId = this._eventSubscriptionId++;
    this._eventNameToSubscriptionMap.get(eventName).push(new EventSubscription(eventSubscriptionId, callbackFunction));
    this._eventSubscriptionIdToEventNameMap.set(eventSubscriptionId, eventName);
    return eventSubscriptionId;
  }

  public unsubscribe(eventSubscriptionId: number): boolean {
    if (eventSubscriptionId == null) {
      throw new Error('invalid eventSubscriptionId');
    }
    if (!this._eventSubscriptionIdToEventNameMap.has(eventSubscriptionId)) {
      return false;
    }
    const eventName = this._eventSubscriptionIdToEventNameMap.get(eventSubscriptionId);
    const eventSubscriptionList: Array<EventSubscription<any>> = this._eventNameToSubscriptionMap.get(eventName);

    let idxToRemove: number;
    for (let i = 0; i < eventSubscriptionList.length; i++) {
      const eventSubscription: EventSubscription<any> = eventSubscriptionList[i];
      if (eventSubscription.id === eventSubscriptionId) {
        idxToRemove = i;
        break;
      }
    }

    this._eventSubscriptionIdToEventNameMap.delete(eventSubscriptionId);
    this._eventNameToSubscriptionMap.get(eventName).splice(idxToRemove);
    return true;
  }

  public emit<T>(eventName: string, eventData?: T) {
    if (!eventName || eventName.trim() === '') {
      throw new Error('invalid eventName');
    }

    if (!this._eventNameToSubscriptionMap.has(eventName)) {
      throw new Error(`No subscribers to ${eventName}`);
    }

    const eventSubscriptionList: Array<EventSubscription<T>> = this._eventNameToSubscriptionMap.get(eventName);
    for (const eventSubscription of eventSubscriptionList) {
      eventSubscription.callbackFunction(eventData);
    }
  }
}
