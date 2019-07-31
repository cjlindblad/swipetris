import createEventDispatcher from './index';

const createMockClient = (eventList: string[]): Client => ({
  handle: (event: DispatchEvent): void => {
    eventList.push(event.eventType);
  }
});

describe('event dispatcher', (): void => {
  it('sends event to client', (): void => {
    const eventTypes: string[] = [];

    const mockClient = createMockClient(eventTypes);

    const eventDispatcher = createEventDispatcher();

    eventDispatcher.register(mockClient);

    eventDispatcher.dispatch({ eventType: 'test event' });

    expect(eventTypes).toEqual(['test event']);
  });

  it('doesnt send events to unregistered clients', (): void => {
    const eventTypes: string[] = [];

    const eventDispatcher = createEventDispatcher();

    const firstMockClient = createMockClient(eventTypes);
    const unregisterFirstMockClient = eventDispatcher.register(firstMockClient);

    eventDispatcher.dispatch({ eventType: 'first event' });

    const secondMockClient = createMockClient(eventTypes);
    eventDispatcher.register(secondMockClient);

    eventDispatcher.dispatch({ eventType: 'second event' });

    unregisterFirstMockClient();

    eventDispatcher.dispatch({ eventType: 'third event' });

    const expectedResult = [
      'first event',
      'second event',
      'second event',
      'third event'
    ];

    expect(eventTypes).toEqual(expectedResult);
  });
});
