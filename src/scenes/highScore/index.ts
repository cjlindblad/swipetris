import { SceneInitializer, MenuItem } from '../types';
import { SceneTransition } from '../../game/enums';
import createMenu from '../menuTemplate';
import { Render } from '../../render/types';
import DependencyContainer from '../../dependencyContainer';
import { HighScore } from '../../highScore/types';

const initializeHighScore: SceneInitializer = params => {
  const { changeScene, dispatch, options } = params;

  const highScore = DependencyContainer.resolve('highScore') as HighScore;
  const highScores = highScore.load();

  const render: Render = DependencyContainer.resolve('render') as Render;

  const menuItems: MenuItem[] = [
    {
      text: (): string => 'Back',
      action: (): void => changeScene(SceneTransition.HighScoreToStart)
    }
  ];

  const text = highScores
    .map((score, i) => `${i + 1} - ${score.name} ${score.value}`)
    .join('\n');

  const menu = createMenu(render, menuItems, options, text);

  return menu;
};

export default initializeHighScore;
