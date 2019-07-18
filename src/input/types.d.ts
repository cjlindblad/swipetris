import { INPUT_TYPE } from './enums';

interface ISetupInputListeners {
  (param: ISetupInputListenersParam): void;
}

interface ISetupInputListenersParam {
  handleInput(inputType: INPUT_TYPE): void;
  element?: HTMLElement | null;
}
