import { HandleInput, RegisterInputHandler, InputHandler } from './types';

interface InputObserver {
  id: number;
  inputHandler: InputHandler;
}

interface Unregister {
  (id: number): void;
}

const createInputController = () => {
  let inputObservers: InputObserver[] = [];
  let observerIndex = 0;

  const register: RegisterInputHandler = inputHandler => {
    const id = observerIndex;
    observerIndex += 1;
    const inputObserver: InputObserver = {
      id,
      inputHandler
    };
    inputObservers.push(inputObserver);

    return () => _unregister(id);
  };

  const _unregister: Unregister = id => {
    inputObservers = inputObservers.filter(observer => observer.id !== id);
  };

  const handleInput: HandleInput = input => {
    inputObservers.forEach(observer => {
      observer.inputHandler.handleInput(input);
    });
  };

  // public api
  return {
    register,
    handleInput
  };
};

export default createInputController;
