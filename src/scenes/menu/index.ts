import { SceneTransition } from '../../game/enums';
import { SceneInitializer, MenuItem } from '../types';
import createMenu from '../menuTemplate';
import DependencyContainer from '../../dependencyContainer';

const initializeMenu: SceneInitializer = changeScene => {
  const render: Render = DependencyContainer.resolve('render') as Render;

  const menuItems: MenuItem[] = [
    {
      text: 'Start game',
      action: (): void => changeScene(SceneTransition.StartToGame)
    },
    {
      text: 'Options',
      action: (): void => changeScene(SceneTransition.StartToOptions)
    }
  ];

  const menu = createMenu(render, menuItems);

  return menu;
};

export default initializeMenu;
