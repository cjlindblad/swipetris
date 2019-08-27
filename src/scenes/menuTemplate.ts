import { wrapModulo } from '../underdash';
import { MenuItem } from './types';
import { Scene } from '../game/types';
import { EventType } from '../eventDispatcher/enums';
import { HandleEvent } from '../eventDispatcher/types';
import { Render } from '../render/types';
import { GameStateRepresentation } from './gameState/types';

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
      nextPieceString: '',
      score: 0,
      level: 1
    };
  };

  const handleEvent: HandleEvent = event => {
    switch (event.type) {
      case EventType.InputDown:
        activeMenuIndex = wrapModulo(activeMenuIndex + 1, menuItems.length);
        render(getRepresentation());
        break;
      case EventType.InputUp:
        activeMenuIndex = wrapModulo(activeMenuIndex - 1, menuItems.length);
        render(getRepresentation());
        break;
      case EventType.Confirmation:
      case EventType.Rotate:
      case EventType.RotateReverse:
        menuItems[activeMenuIndex].action();
        break;
      default:
        break;
    }
  };

  // initial render
  render(getRepresentation());

  return {
    handleEvent
  };
};

export default createMenu;
