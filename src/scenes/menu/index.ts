import { SceneTransition } from '../../game/enums';
import { SceneInitializer, MenuItem } from '../types';
import createMenu from '../menuTemplate';
import DependencyContainer from '../../dependencyContainer';

const initializeMenu: SceneInitializer = changeScene => {
  const render: IRender = DependencyContainer.resolve('render') as IRender;

  const menuItems: MenuItem[] = [
    {
      text: 'Start game',
      action: () => changeScene(SceneTransition.StartToGame)
    },
    {
      text: 'Options',
      action: () => changeScene(SceneTransition.StartToOptions)
    }
  ];

  const menu = createMenu(render, menuItems);

  return menu;
};

export default initializeMenu;
