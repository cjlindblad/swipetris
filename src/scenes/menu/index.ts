import { SceneTransition } from '../../game/enums';
import { SceneInitializer, MenuItem } from '../types';
import createMenu from '../menuTemplate';
import DependencyContainer from '../../dependencyContainer';
import { Render } from '../../render/types';

const initializeMenu: SceneInitializer = ({ changeScene, options }) => {
  const render: Render = DependencyContainer.resolve('render') as Render;

  const menuItems: MenuItem[] = [
    {
      text: (): string => 'Start game',
      action: (): void => changeScene(SceneTransition.StartToGame)
    },
    {
      text: (): string => 'Options',
      action: (): void => changeScene(SceneTransition.StartToOptions)
    },
    {
      text: (): string => 'High score',
      action: (): void => changeScene(SceneTransition.StartToHighScore)
    }
  ];

  const menu = createMenu(render, menuItems, options);

  return menu;
};

export default initializeMenu;
