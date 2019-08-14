import { SceneInitializer, MenuItem } from '../types';
import { SceneTransition } from '../../game/enums';
import createMenu from '../menuTemplate';
import DependencyContainer from '../../dependencyContainer';
import { Render } from '../../render/types';

const initializeOptions: SceneInitializer = ({ changeScene }) => {
  const render: Render = DependencyContainer.resolve('render') as Render;

  const menuItems: MenuItem[] = [
    { text: 'Nothing to do here yet', action: (): void => {} },
    {
      text: 'Back to start screen',
      action: (): void => changeScene(SceneTransition.OptionsToStart)
    }
  ];

  const menu = createMenu(render, menuItems);

  return menu;
};

export default initializeOptions;
