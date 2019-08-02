import createEventDispatcher from './index';
import { Client, DispatchEvent } from './types';

const createMockClient = (eventList: string[]): Client => ({
  handleEvent: (event: DispatchEvent): void => {
    eventList.push(event.type);
  }
});

describe('event dispatcher', (): void => {
  it('sends event to client', (): void => {
    // TODO re-write this
  });
  it('doesnt send events to unregistered clients', (): void => {
    // TODO re-write this
  });
});
