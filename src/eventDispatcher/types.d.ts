import { EventType } from './enums';

interface EventDispatcher {
  register: Register;
  dispatch: Dispatch;
}

interface Client {
  handleEvent: HandleEvent;
}

interface HandleEvent {
  (event: DispatchEvent): void;
}

interface Identity {
  id: number;
}

type IdentityClient = Identity & Client;

interface Register {
  (client: Client): UnregisterCallback;
}

interface UnregisterCallback {
  (): void;
}

interface Dispatch {
  (event: DispatchEvent): void;
}

interface DispatchEvent {
  type: EventType;
}
