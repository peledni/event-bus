[![npm version](https://badge.fury.io/js/%40peledni%2Fevent-bus.svg)](https://badge.fury.io/js/%40peledni%2Fevent-bus)

# @peledni/event-bus
A typescript angular library that lets you emit and subscribe to events from anywhere in your code base.

## To install
npm i @peledni/event-bus

## Usage

This library provides an angular service called "EventBusService". Once injected into your service or component, the library provides 3 methods:

* **subscribe<T>(eventName: string, callbackFunction: (eventData: T) => void): number** - subscribes to an event and will call the provided callbackFunction once an event of that name has been emitted. Returns a subscriptionEventId to be used later with *unsubscribe*
* **unsubscribe(eventSubscriptionId: number): boolean** - Unsubscribes from an event according to the specified subscriptionEventId. Returns a boolean if unsubscribe was successful.
* **emit<T>(eventName: string, eventData?: T)** - Emits an event, will call subscribers of that event.

## Example

*Assuming EventBusService was injected and saved privately as `_eventBusService`*

```typescript
let eventSubscriptionId = this._eventBusService.subscribe('someEvent', function (eventData) {
  console.log(`Received event data: ${eventData}`);
});

this._eventBusService.emit('someEvent', 'hello world');
let unsubscribeSuccessful = this._eventBusService.unsubscribe(eventSubscriptionId);
console.log(`Unsubscribed? ${unsubscribeSuccessful}`);
```
