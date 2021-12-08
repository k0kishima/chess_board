import { Color } from '@/types';
import { Position } from './Position';

export abstract class Piece {
  readonly color: Color;

  constructor(color: Color) {
    this.color = color;
  }

  abstract movablePositionsFrom(currentPosition: Position): Position[];
  abstract attackablePositionsFrom(currentPosition: Position): Position[];
}
