import { SceneInitializer } from '../types';
import { HandleInput } from '../../input/types';
import { INPUT_TYPE } from '../../input/enums';
import { wrapModulo } from '../../underdash';
import { SceneTransition } from '../../game/enums';

// TODO lots of similarities with menu code

const initializeOptions: SceneInitializer = (render, changeScene) => {
  const menuItems = ['Nothing to do here yet', 'Back to start screen'];
  let activeMenuIndex = 0;

  const handleInput: HandleInput = input => {
    switch (input) {
      case INPUT_TYPE.INPUT_DOWN:
        activeMenuIndex = wrapModulo(activeMenuIndex + 1, menuItems.length);
        render(getRepresentation());
        break;
      case INPUT_TYPE.INPUT_UP:
        activeMenuIndex = wrapModulo(activeMenuIndex - 1, menuItems.length);
        render(getRepresentation());
        break;
      case INPUT_TYPE.CONFIRMATION:
        if (activeMenuIndex === 1) {
          changeScene(SceneTransition.OptionsToStart);
        }
        break;
    }
  };

  const getRepresentation = (): GameStateRepresentation => {
    let representation = '';
    menuItems.forEach((item, index) => {
      if (index === activeMenuIndex) {
        representation += `-> ${item}\n`;
      } else {
        representation += `   ${item}\n`;
      }
    });

    return {
      renderString: representation,
      nextPiece: '',
      score: 0
    };
  };

  // initial render
  render(getRepresentation());

  return {
    handleInput
  };
};

export default initializeOptions;
