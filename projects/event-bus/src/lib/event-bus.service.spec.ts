import {TestBed, inject} from '@angular/core/testing';
import {EventBusService} from './event-bus.service';

describe('EventBusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventBusService]
    });
  });

  it('should be created', inject([EventBusService], (service: EventBusService) => {
    expect(service).toBeTruthy();
  }));

  it('should receive emitted event', inject([EventBusService], (service: EventBusService) => {
    service.subscribe('eventToReceive', function (eventData) {
      console.log('Event data', eventData);
      expect(eventData).toBe('hello', `Expected to receive 'hello'`);
    });
    service.emit('eventToReceive', 'hello');
  }));

  it('should send valid subscription input', inject([EventBusService], (service: EventBusService) => {
    let nullEventError;
    try {
      service.subscribe(null, function () {

      });
    } catch (e) {
      nullEventError = e;
    }
    expect(nullEventError != null).toBeTruthy('Expected error on null eventName');

    let nullCallbackFunctionError;
    try {
      service.subscribe('nullCallbackFunctionEvent', null);
    } catch (e) {
      nullCallbackFunctionError = e;
    }
    expect(nullCallbackFunctionError != null).toBeTruthy('Expected error on null callbackFunction');
  }));


  it('should be able to unsubscribe', inject([EventBusService], (service: EventBusService) => {
    const eventSubscriptionId = service.subscribe('eventToUnsubscribeFrom', function () {
    });
    expect(service.unsubscribe(eventSubscriptionId)).toBeTruthy('Expected unsubscribe result to be true');
  }));


});
