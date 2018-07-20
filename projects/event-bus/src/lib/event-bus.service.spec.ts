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
    service.on('eventToReceive', function (eventData) {
      console.log('Event data', eventData);
      expect(eventData).toBe('hello', `Expected to receive 'hello'`);
    });
    service.emit('eventToReceive', 'hello');
  }));

  it('should send valid subscription input', inject([EventBusService], (service: EventBusService) => {
    let nullEventError;
    try {
      service.on(null, function () {

      });
    } catch (e) {
      nullEventError = e;
    }
    expect(nullEventError != null).toBeTruthy('Expected error on null eventName');

    let nullCallbackFunctionError;
    try {
      service.on('nullCallbackFunctionEvent', null);
    } catch (e) {
      nullCallbackFunctionError = e;
    }
    expect(nullCallbackFunctionError != null).toBeTruthy('Expected error on null callbackFunction');
  }));


  it('should be able to off', inject([EventBusService], (service: EventBusService) => {
    const eventSubscriptionId = service.on('eventToUnsubscribeFrom', function () {
    });
    expect(service.off(eventSubscriptionId)).toBeTruthy('Expected off result to be true');
  }));


});
