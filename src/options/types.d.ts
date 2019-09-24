import { Client } from '../eventDispatcher/types';

interface GameOptions {
  eventClient: Client;
  options: Options;
}

interface Options {
  ghostPieceActive: boolean;
  consoleRenderingActive: boolean;
}
