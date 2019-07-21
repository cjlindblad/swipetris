import createInputController from './inputController';
import { INPUT_TYPE } from './enums';

describe('inputController', () => {
  it('stops handling input when unregistered', () => {
    const inputController = createInputController();

    // keep a list of input responses
    const inputHandlerResponses: INPUT_TYPE[] = [];
    const handleInput = (input: INPUT_TYPE) =>
      inputHandlerResponses.push(input);

    const mockInputHandler1 = {
      handleInput
    };
    const mockInputHandler2 = {
      handleInput
    };

    const unregister1 = inputController.register(mockInputHandler1);
    const unregister2 = inputController.register(mockInputHandler2);

    inputController.handleInput(INPUT_TYPE.INPUT_LEFT);
    unregister1();
    inputController.handleInput(INPUT_TYPE.INPUT_RIGHT);
    unregister2();
    inputController.handleInput(INPUT_TYPE.INPUT_LEFT);

    const expectedInputs = [
      INPUT_TYPE.INPUT_LEFT,
      INPUT_TYPE.INPUT_LEFT,
      INPUT_TYPE.INPUT_RIGHT
    ];

    expect(inputHandlerResponses).toEqual(expectedInputs);
  });
});
