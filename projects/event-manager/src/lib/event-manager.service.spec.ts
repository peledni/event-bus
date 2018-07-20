import {TestBed, inject} from '@angular/core/testing';
import {EventManagerService} from './event-manager.service';

describe('EventManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventManagerService]
    });
  });

  it('should be created', inject([EventManagerService], (service: EventManagerService) => {
    expect(service).toBeTruthy();
  }));

  it('should not emit before subscribing', inject([EventManagerService], (service: EventManagerService) => {
    let err = null;
    try {
      service.emit('unsubscribedEvent', {myData: 'isBad'});
    } catch (e) {
      err = e;
    }
    expect(err != null).toBeTruthy();
  }));

  it('should receive emitted event', inject([EventManagerService], (service: EventManagerService) => {
    service.subscribe('eventToReceive', function (eventData) {
      console.log('Event data', eventData);
      expect(eventData).toBe('hello', `Expected to receive 'hello'`);
    });
    service.emit('eventToReceive', 'hello');
  }));

  it('should send valid subscription input', inject([EventManagerService], (service: EventManagerService) => {
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


  it('should be able to unsubscribe', inject([EventManagerService], (service: EventManagerService) => {
    const eventSubscriptionId = service.subscribe('eventToUnsubscribeFrom', function () {
    });
    expect(service.unsubscribe(eventSubscriptionId)).toBeTruthy('Expected unsubscribe result to be true');
  }));


});
