import createEventDispatcher from './index';
import { Client, DispatchEvent } from './types';
import { EventType } from './enums';

const createMockClient = (eventList: string[]): Client => ({
  handleEvent: (event: DispatchEvent): void => {
    eventList.push(event.type);
  }
});

describe('event dispatcher', (): void => {
  it('sends event to client', (): void => {
    const eventList: string[] = [];
    const eventDispatcher = createEventDispatcher();
    const client = createMockClient(eventList);
    eventDispatcher.register(client);

    eventDispatcher.dispatch({
      type: EventType.Confirmation
    });

    const expectedEventList = [EventType.Confirmation].map(e => String(e));
    expect(eventList).toEqual(expectedEventList);
  });
  it('doesnt send events to unregistered clients', (): void => {
    const eventList: string[] = [];
    const eventDispatcher = createEventDispatcher();
    const firstClient = createMockClient(eventList);
    const unregisterFirstClient = eventDispatcher.register(firstClient);

    eventDispatcher.dispatch({
      type: EventType.InputLeft
    });

    const secondClient = createMockClient(eventList);
    eventDispatcher.register(secondClient);

    eventDispatcher.dispatch({
      type: EventType.InputUp
    });

    unregisterFirstClient();

    eventDispatcher.dispatch({
      type: EventType.InputRight
    });

    const expectedEventList = [
      EventType.InputLeft,
      EventType.InputUp,
      EventType.InputUp,
      EventType.InputRight
    ].map(e => String(e));
    expect(eventList).toEqual(expectedEventList);
  });
});
