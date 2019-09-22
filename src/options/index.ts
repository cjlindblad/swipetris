import { DispatchEvent } from '../eventDispatcher/types';
import { EventType } from '../eventDispatcher/enums';
import { GameOptions } from './types';

const initializeGameOptions = (): GameOptions => {
  const options = {
    ghostPieceActive: true
  };

  const eventClient = {
    handleEvent: (event: DispatchEvent): void => {
      if (event.type === EventType.ToggleGhostPieceOption) {
        options.ghostPieceActive = !options.ghostPieceActive;
      }
    }
  };

  return {
    options,
    eventClient
  };
};

export default initializeGameOptions;
