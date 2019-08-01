import { HandleInput } from '../input/types';
import { INPUT_TYPE } from '../input/enums';
import { wrapModulo } from '../underdash';
import { MenuItem } from './types';
import { Scene } from '../game/types';

const createMenu = (render: Render, menuItems: MenuItem[]): Scene => {
  let activeMenuIndex = 0;

  const getRepresentation = (): GameStateRepresentation => {
    let representation = '';
    menuItems.forEach(
      (item, index): void => {
        if (index === activeMenuIndex) {
          representation += `-> ${item.text}\n`;
        } else {
          representation += `   ${item.text}\n`;
        }
      }
    );

    return {
      renderString: representation,
      nextPiece: '',
      score: 0
    };
  };

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
        menuItems[activeMenuIndex].action();
        break;
      default:
        break;
    }
  };

  // initial render
  render(getRepresentation());

  return {
    handleInput
  };
};

export default createMenu;
