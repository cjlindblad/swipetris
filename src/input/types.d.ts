import { INPUT_TYPE } from './enums';

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
  (inputType: INPUT_TYPE): void;
}

interface InputHandler {
  handleInput: HandleInput;
}

interface ISetupInputListeners {
  (param: ISetupInputListenersParam): void;
}

interface ISetupInputListenersParam {
  handleInput: HandleInput;
  element?: HTMLElement | null;
}
