// TODO think about other solution to this

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export enum EventType {
  InputUp = 'InputUp',
  InputDown = 'InputDown',
  InputLeft = 'InputLeft',
  InputRight = 'InputRight',
  Confirmation = 'Confirmation',
  Rotate = 'Rotate',
  RotateReverse = 'RotateReverse',
  GravityDrop = 'GravityDrop',
  QuickDrop = 'QuickDrop',
  StartGravityInterval = 'StartGravityInterval',
  IncreaseGravityInterval = 'IncreaseGravityInterval',
  ClearGravityInterval = 'ClearGravityInterval',
  Restart = 'Restart',
  ToggleGhostPieceOption = 'ToggleGhostPieceOption'
}
