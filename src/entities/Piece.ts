import { Color, PieceSymbolOfFEN } from '@/types';
import { Position } from './Position';

export abstract class Piece {
  readonly color: Color;

  constructor(color: Color) {
    this.color = color;
  }

  toString() {
    return this.toSymbol();
  }

  abstract movablePositionsFrom(currentPosition: Position): Position[];
  abstract attackablePositionsFrom(currentPosition: Position): Position[];
  abstract toSymbol(): PieceSymbolOfFEN;
}
