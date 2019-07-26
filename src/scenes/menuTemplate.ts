import { HandleInput } from '../input/types';
import { INPUT_TYPE } from '../input/enums';
import { wrapModulo } from '../underdash';
import { MenuItem } from './types';

const createMenu = (render: IRender, menuItems: MenuItem[]) => {
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
        menuItems[activeMenuIndex].action();
        break;
      default:
        break;
    }
  };

  const getRepresentation = (): GameStateRepresentation => {
    let representation = '';
    menuItems.forEach((item, index) => {
      if (index === activeMenuIndex) {
        representation += `-> ${item.text}\n`;
      } else {
        representation += `   ${item.text}\n`;
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

export default createMenu;
