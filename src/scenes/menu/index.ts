import { IScene, IChangeScreen } from '../../game/types';
import { HandleInput } from '../../input/types';
import { INPUT_TYPE } from '../../input/enums';
import { wrapModulo } from '../../underdash';
import { ScreenTransition } from '../../game/enums';

const initializeMenu = (
  render: IRender,
  changeScreen: IChangeScreen
): IScene => {
  const menuItems = ['Start game', 'Some other option'];
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
        if (activeMenuIndex === 0) {
          changeScreen(ScreenTransition.StartToGame);
        }
        break;
      default:
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

export default initializeMenu;
