import { SceneInitializer, SceneTransitionMapping } from './types';
import { HandleInput } from '../input/types';
import { INPUT_TYPE } from '../input/enums';
import initializeSceneController from './sceneController';
import { SceneTransition } from '../game/enums';

describe('scene controller', () => {
  it('re-routes input when switching scene', () => {
    const mockRender: IRender = (param: IRenderParam) => {
      // does nothing
    };

    const inputs: INPUT_TYPE[] = [];
    const mockInputHandler: HandleInput = input => inputs.push(input);

    const firstSceneInitializer: SceneInitializer = () => ({
      handleInput: mockInputHandler
    });

    const secondSceneInitializer: SceneInitializer = () => ({
      handleInput: mockInputHandler
    });

    const finalSceneInitializer: SceneInitializer = () => ({
      handleInput: mockInputHandler
    });

    const sceneTransitions: SceneTransitionMapping[] = [
      {
        transition: SceneTransition.StartToGame,
        initializer: secondSceneInitializer
      },
      {
        transition: SceneTransition.StartToOptions,
        initializer: finalSceneInitializer
      }
    ];

    const sceneController = initializeSceneController(
      mockRender,
      firstSceneInitializer,
      sceneTransitions
    );

    sceneController.handleInput(INPUT_TYPE.INPUT_UP);
    sceneController.changeScene(SceneTransition.StartToGame);
    sceneController.handleInput(INPUT_TYPE.INPUT_RIGHT);
    sceneController.changeScene(SceneTransition.StartToOptions);
    sceneController.handleInput(INPUT_TYPE.INPUT_DOWN);

    const expectedResult: string = JSON.stringify([
      INPUT_TYPE.INPUT_UP,
      INPUT_TYPE.INPUT_RIGHT,
      INPUT_TYPE.INPUT_DOWN
    ]);

    expect(JSON.stringify(inputs)).toEqual(expectedResult);
  });
});
