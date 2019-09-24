import { SceneInitializer, MenuItem } from '../types';
import { SceneTransition } from '../../game/enums';
import createMenu from '../menuTemplate';
import DependencyContainer from '../../dependencyContainer';
import { Render } from '../../render/types';
import { EventType } from '../../eventDispatcher/enums';

const initializeOptions: SceneInitializer = params => {
  const { changeScene, dispatch, options } = params;

  const render: Render = DependencyContainer.resolve('render') as Render;

  const menuItems: MenuItem[] = [
    {
      text: (): string =>
        `Ghost pieces - ${options.ghostPieceActive ? 'on' : 'off'}`,
      action: (): void => {
        dispatch({ type: EventType.ToggleGhostPieceOption });
        dispatch({ type: EventType.Render });
      }
    },
    {
      // TODO only in web environment
      text: (): string =>
        `Console rendering - ${options.consoleRenderingActive ? 'on' : 'off'}`,
      action: (): void => {
        dispatch({ type: EventType.ToggleConsoleRenderingOption });
        dispatch({ type: EventType.Render });
      }
    },
    {
      text: (): string => 'Back to start screen',
      action: (): void => changeScene(SceneTransition.OptionsToStart)
    }
  ];

  const menu = createMenu(render, menuItems, options);

  return menu;
};

export default initializeOptions;
