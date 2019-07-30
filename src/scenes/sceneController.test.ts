import { SceneInitializer, SceneTransitionMapping } from './types';
import { HandleInput } from '../input/types';
import { INPUT_TYPE } from '../input/enums';
import initializeSceneController from './sceneController';
import { SceneTransition } from '../game/enums';
import { Scene } from '../game/types';

describe('scene controller', (): void => {
  it('re-routes input when switching scene', (): void => {
    const inputs: INPUT_TYPE[] = [];
    const mockInputHandler: HandleInput = (input): void => {
      inputs.push(input);
    };

    const firstSceneInitializer: SceneInitializer = (): Scene => ({
      handleInput: mockInputHandler
    });

    const secondSceneInitializer: SceneInitializer = (): Scene => ({
      handleInput: mockInputHandler
    });

    const finalSceneInitializer: SceneInitializer = (): Scene => ({
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
