import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private _eventNameToSubscriptionMap: Map<string, Map<number, Function>> = new Map<string, Map<number, Function>>();
  private _eventSubscriptionIdToEventNameMap: Map<number, string> = new Map<number, string>();
  private _eventSubscriptionId = 0;

  public on<T>(eventName: string, callbackFunction: (eventData: T) => void): number {
    if (!eventName || eventName.trim() === '') {
      throw new Error('invalid eventName');
    }
    if (typeof callbackFunction !== 'function') {
      throw new Error('invalid callbackFunction');
    }
    if (!this._eventNameToSubscriptionMap.has(eventName)) {
      this._eventNameToSubscriptionMap.set(eventName, new Map<number, Function>());
    }
    const eventSubscriptionId = this._eventSubscriptionId++;
    this._eventNameToSubscriptionMap.get(eventName).set(eventSubscriptionId, callbackFunction);
    this._eventSubscriptionIdToEventNameMap.set(eventSubscriptionId, eventName);
    return eventSubscriptionId;
  }

  public off(eventSubscriptionId: number): boolean {
    if (eventSubscriptionId == null) {
      throw new Error('invalid eventSubscriptionId');
    }
    if (!this._eventSubscriptionIdToEventNameMap.has(eventSubscriptionId)) {
      return false;
    }
    const eventName = this._eventSubscriptionIdToEventNameMap.get(eventSubscriptionId);
    this._eventSubscriptionIdToEventNameMap.delete(eventSubscriptionId);
    this._eventNameToSubscriptionMap.get(eventName).delete(eventSubscriptionId);
    return true;
  }

  public emit<T>(eventName: string, eventData?: T) {
    if (!eventName || eventName.trim() === '') {
      throw new Error('invalid eventName');
    }

    if (!this._eventNameToSubscriptionMap.has(eventName)) {
      return;
    }

    this._eventNameToSubscriptionMap.get(eventName).forEach(function (callbackFunction) {
      callbackFunction(eventData);
    });
  }
}
