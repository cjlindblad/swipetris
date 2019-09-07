import { SceneInitializer, MenuItem } from '../types';
import { SceneTransition } from '../../game/enums';
import createMenu from '../menuTemplate';
import DependencyContainer from '../../dependencyContainer';
import { Render } from '../../render/types';
import { EventType } from '../../eventDispatcher/enums';

const initializeOptions: SceneInitializer = params => {
  const { changeScene, dispatch } = params;

  const render: Render = DependencyContainer.resolve('render') as Render;

  const menuItems: MenuItem[] = [
    {
      text: 'Ghost pieces -',
      action: (): void => dispatch({ type: EventType.ToggleGhostPieceOption })
    },
    {
      text: 'Back to start screen',
      action: (): void => changeScene(SceneTransition.OptionsToStart)
    }
  ];

  const menu = createMenu(render, menuItems);

  return menu;
};

export default initializeOptions;
