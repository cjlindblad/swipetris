import { EventType } from '../eventDispatcher/enums';

interface InputController {
  register: RegisterInputHandler;
  handleInput: HandleInput;
}

interface RegisterInputHandler {
  (observer: InputHandler): UnregisterInputHandler;
}

interface UnregisterInputHandler {
  (): void;
}

interface HandleInput {
  (eventType: EventType): void;
}

interface InputHandler {
  handleInput: HandleInput;
}

interface SetupInputListeners {
  (param: SetupInputListenersParam): void;
}

interface SetupInputListenersParam {
  handleInput: HandleInput;
  element?: HTMLElement | null;
}
