/*

Possible scene transitions

+--------------+         +-------------+
|              |-------->|             |
| Start screen |         | Active game |
|              |<--------|             |
+--------------+         +-------------+
  ^ |      ^ | 
  | |      | |   +------------+
  | |      | +-->|            |
  | |      |     | High score |
  | |      +-----|            |
  | v            +------------+
+---------+              
|         |
| Options |
|         |
+---------+

*/

export enum ScreenTransition {
  StartToGame,
  GameToStart,
  StartToOptions,
  OptionsToStart,
  StartToHighScore,
  HighScoreToStart
}
