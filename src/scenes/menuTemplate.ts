import { wrapModulo } from '../underdash';
import { MenuItem } from './types';
import { Scene } from '../game/types';
import { EventType } from '../eventDispatcher/enums';
import { HandleEvent } from '../eventDispatcher/types';
import { Render } from '../render/types';
import { GameStateRepresentation } from './gameState/types';
import { Options } from '../options/types';

const createMenu = (
  render: Render,
  menuItems: MenuItem[],
  options: Options,
  text?: string
): Scene => {
  let activeMenuIndex = 0;

  const getRepresentation = (): GameStateRepresentation => {
    let representation = '';

    if (text) {
      representation += `${text.trim()}\n\n`;
    }

    menuItems.forEach((item, index): void => {
      if (index === activeMenuIndex) {
        representation += `-> ${item.text()}\n`;
      } else {
        representation += `   ${item.text()}\n`;
      }
    });

    return {
      renderString: representation,
      nextPieceString: '',
      score: 0,
      level: 1,
      clearedLines: 0,
      options
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
      case EventType.Render:
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
