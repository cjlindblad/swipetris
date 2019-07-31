interface EventDispatcher {
  register: Register;
  dispatch: Dispatch;
}

interface Client {
  handle(event: DispatchEvent): void;
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
  eventType: string; // TODO might want to use enums here
}
