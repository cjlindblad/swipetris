import { createGamePiece } from '../../gamePiece/index';
import { GAME_PIECE_TYPE } from '../../gamePiece/enums';
import {
  getMinMaxCoordinates,
  transpose,
  getNextPieceType
} from '../../gamePiece/utils';
import { COLUMNS, ROWS } from '../../config';
import { GameCharSelector } from '../../config/types';
import DependencyContainer from '../../dependencyContainer';
import { SceneInitializer } from '../types';
import { Coordinate, GamePiece } from '../../gamePiece/types';
import { HandleEvent } from '../../eventDispatcher/types';
import { EventType } from '../../eventDispatcher/enums';
import { Render } from '../../render/types';
import LevelController from './levelController';

// TODO give this whole file some love
export enum GameState {
  Active = 'Active',
  GameOver = 'GameOver'
}

export const initializeGameState: SceneInitializer = ({
  changeScene,
  dispatch
}) => {
  // inject dependencies
  const gameCharSelector: GameCharSelector = DependencyContainer.resolve(
    'gameCharSelector'
  ) as GameCharSelector; // TODO should be automatic
  const render: Render = DependencyContainer.resolve('render') as Render;
  const EMPTY_SPACE_CHAR = gameCharSelector(GAME_PIECE_TYPE.EMPTY_SPACE);

  // state
  let activePiece: GamePiece;
  let nextPiece: GamePiece;
  let gameState: GameState;
  let clearedLines: number;
  let gameBoard: string[][];
  let levelController: LevelController;

  const initialize = (): void => {
    levelController = new LevelController();

    // TODO need to handle initial coordinates in a better way than with hard coded values
    const initialPiece = createGamePiece(getNextPieceType(), {
      x: 2,
      y: 1
    });

    const next = createGamePiece(getNextPieceType(), {
      x: 2,
      y: 1
    });

    // setup state
    activePiece = initialPiece;
    nextPiece = next;
    gameState = GameState.Active;
    clearedLines = 0;
    gameBoard = [];
    for (let y = 0; y < ROWS; y++) {
      gameBoard[y] = [];
      for (let x = 0; x < COLUMNS; x++) {
        gameBoard[y][x] = EMPTY_SPACE_CHAR;
      }
    }
  };

  const isValidMove = (coordinates: Coordinate[]): boolean => {
    let validMove = true;

    for (let i = 0; i < coordinates.length; i++) {
      const coordinate = coordinates[i];
      // check for out of bounds
      if (
        coordinate.x < 0 ||
        coordinate.x >= COLUMNS ||
        coordinate.y < 0 ||
        coordinate.y >= ROWS
      ) {
        validMove = false;
        break;
      }

      // check for collision with rest of board
      if (gameBoard[coordinate.y][coordinate.x] !== EMPTY_SPACE_CHAR) {
        validMove = false;
      }
    }

    return validMove;
  };

  const getRepresentation = (): GameStateRepresentation => {
    // this might be a weird way to do it, but it's a start!

    // create buffer of game state board
    const gameBoardBuffer: string[][] = [];
    for (let y = 0; y < ROWS; y++) {
      gameBoardBuffer[y] = [];
      for (let x = 0; x < COLUMNS; x++) {
        gameBoardBuffer[y][x] = gameBoard[y][x];
      }
    }

    // place active piece
    const state = activePiece.getState();
    state.coordinates.forEach(
      (coordinate): void => {
        gameBoardBuffer[coordinate.y][coordinate.x] = activePiece.getChar();
      }
    );

    // generate string representation
    let renderString = '';
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLUMNS; x++) {
        renderString += gameBoardBuffer[y][x];
      }
      if (y < ROWS - 1) {
        renderString += '\n';
      }
    }

    // not sure if we should just use a big string, or split the "UI" up

    const nextPiecePreview = nextPiece.getPreview();
    let pieceCoordinates: string[][] = [];
    nextPiecePreview.forEach(
      (coordinate): void => {
        if (!pieceCoordinates[coordinate.y]) {
          pieceCoordinates[coordinate.y] = [];
        }
        pieceCoordinates[coordinate.y][coordinate.x] = nextPiece.getChar();
      }
    );

    let previewString = '';
    const [min, max] = getMinMaxCoordinates(nextPiecePreview);
    for (let y = min.y; y <= max.y; y++) {
      for (let x = min.x; x <= max.x; x++) {
        previewString += pieceCoordinates[y][x] || EMPTY_SPACE_CHAR;
      }
      if (y < max.y) {
        previewString += '\n';
      }
    }

    return {
      renderString,
      nextPiece: previewString,
      score: clearedLines,
      level: levelController.getLevel(),
      gameBoard: gameBoardBuffer
    };
  };

  const renderGameState = (): void => {
    render(getRepresentation(), gameState);
  };

  // TODO move gravity handling to separate module
  let gravityInterval: NodeJS.Timeout;
  const setGravityInterval = (interval: number): void => {
    if (gravityInterval) {
      clearInterval(gravityInterval);
    }

    const triggerGravityDrop = (): void => {
      dispatch({ type: EventType.GravityDrop });
      renderGameState();
    };

    gravityInterval = setInterval(triggerGravityDrop, interval);
  };

  const clearGravityInterval = (): void => {
    if (gravityInterval !== null) {
      clearInterval(gravityInterval);
    }
  };

  const startNewGame = (): void => {
    initialize();
    renderGameState();
    dispatch({
      type: EventType.StartGravityInterval
    });
  };

  const handleEvent: HandleEvent = event => {
    switch (event.type) {
      case EventType.Restart:
        if (gameState !== GameState.GameOver) {
          break;
        }

        startNewGame();

        break;
      case EventType.StartGravityInterval:
        setGravityInterval(levelController.getGravityInterval());
        break;
      case EventType.ClearGravityInterval:
        clearGravityInterval();
        break;
      case EventType.InputUp:
        break;
      case EventType.InputLeft:
      case EventType.InputRight:
      case EventType.Rotate:
      case EventType.RotateReverse: {
        if (gameState !== GameState.Active) {
          break;
        }

        const nextState = activePiece.getNextState(event.type);
        const validMove = isValidMove(nextState.coordinates);

        if (validMove) {
          activePiece.setState(nextState);
          break;
        }

        // try to wall kick if possible
        if (
          event.type === EventType.Rotate ||
          event.type === EventType.RotateReverse
        ) {
          const wallKickOffsets = [1, 2, -1, -2];
          for (let i = 0; i < wallKickOffsets.length; i++) {
            const offset = wallKickOffsets[i];
            const transposition = transpose(
              nextState.coordinates,
              nextState.origo,
              offset,
              0
            );
            if (isValidMove(transposition.coordinates)) {
              activePiece.setState(transposition);
              break;
            }
          }
        }

        break;
      }
      case EventType.InputDown:
      case EventType.GravityDrop: {
        if (gameState !== GameState.Active) {
          break;
        }
        // TODO possible performance thief
        dispatch({ type: EventType.StartGravityInterval });

        const nextState = activePiece.getNextState(event.type);

        if (nextState.moves === undefined) {
          throw new Error("Expected to find property 'moves' on nextState");
        }

        const validMove = isValidMove(nextState.coordinates);
        if (validMove) {
          activePiece.setState({ ...nextState, moves: nextState.moves + 1 });
        } else {
          if (nextState.moves === 0) {
            dispatch({
              type: EventType.ClearGravityInterval
            });
            gameState = GameState.GameOver;
            // TODO show some game over info
            break;
          }
          // this is where a piece lands
          // lots of stuff happening. maybe break it out to separate functions for clarity.

          // transfer active piece to game board
          const activePieceCoordinates = activePiece.getState().coordinates;
          activePieceCoordinates.forEach(
            (coordinate): void => {
              gameBoard[coordinate.y][coordinate.x] = activePiece.getChar();
            }
          );

          // check for solid lines
          const solidRows: number[] = [];
          for (let y = ROWS - 1; y >= 0; y--) {
            let solid = true;
            for (let x = 0; x < COLUMNS; x++) {
              if (gameBoard[y][x] === EMPTY_SPACE_CHAR) {
                solid = false;
                break;
              }
            }
            if (solid) {
              solidRows.push(y);
            }
          }

          // clear solid lines
          solidRows.forEach(
            (y): void => {
              for (let x = 0; x < COLUMNS; x++) {
                gameBoard[y][x] = EMPTY_SPACE_CHAR;
              }
            }
          );

          // move everything down after clearace
          if (solidRows.length > 0) {
            // start at first solid line row minus one
            for (let y = solidRows[0] - 1; y >= 0; y--) {
              for (let x = 0; x < COLUMNS; x++) {
                if (gameBoard[y][x] !== EMPTY_SPACE_CHAR) {
                  const pieceChar = gameBoard[y][x];

                  // only move max the number of lines cleared
                  const CLEARED_LINES = solidRows.filter((e): boolean => e > y)
                    .length;

                  let nextY = y;
                  let freeSpaceDownwards = true;
                  while (freeSpaceDownwards && nextY < y + CLEARED_LINES) {
                    if (gameBoard[nextY + 1][x] === EMPTY_SPACE_CHAR) {
                      nextY++;
                    } else {
                      freeSpaceDownwards = false;
                    }
                  }

                  // only swap if piece was moved
                  if (y !== nextY) {
                    gameBoard[y][x] = EMPTY_SPACE_CHAR;
                    gameBoard[nextY][x] = pieceChar;
                  }
                }
              }
            }
          }

          // register cleared lines to score
          clearedLines += solidRows.length;

          // crude level increaser
          solidRows.forEach(() => {
            levelController.increaseLevel();
          });
          dispatch({
            type: EventType.StartGravityInterval
          });

          // add new active piece
          const newPiece = createGamePiece(getNextPieceType(), {
            x: 2,
            y: 1
          });
          activePiece = nextPiece;
          nextPiece = newPiece;
        }
        break;
      }
      default:
        break;
    }

    renderGameState();
  };

  // kick off everything
  startNewGame();

  return {
    handleEvent
  };
};
