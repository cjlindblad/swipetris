import { SceneInitializer, MenuItem } from '../types';
import { SceneTransition } from '../../game/enums';
import createMenu from '../menuTemplate';

const initializeOptions: SceneInitializer = (render, changeScene) => {
  const menuItems: MenuItem[] = [
    { text: 'Nothing to do here yet', action: () => {} },
    {
      text: 'Back to start screen',
      action: () => changeScene(SceneTransition.OptionsToStart)
    }
  ];

  const menu = createMenu(render, menuItems);

  return menu;
};

export default initializeOptions;
