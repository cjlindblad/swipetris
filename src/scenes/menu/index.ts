import { SceneTransition } from '../../game/enums';
import { SceneInitializer, MenuItem } from '../types';
import createMenu from '../menuTemplate';

const initializeMenu: SceneInitializer = (render, changeScene) => {
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
