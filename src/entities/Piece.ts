import { Color, MoveDirection, PieceSymbolOfFEN } from '@/types';
import { movablePositionsGetterFor, reverseOf } from '@/utils/PieceMovement';
import { Position } from './Position';

export abstract class Piece {
  readonly color: Color;

  constructor(color: Color) {
    this.color = color;
  }

  abstract movablePositionsFrom(currentPosition: Position): Position[];
  abstract attackablePositionsFrom(currentPosition: Position): Position[];
  abstract toSymbol(): PieceSymbolOfFEN;

  toString() {
    return this.toSymbol();
  }
}

// TODO: 継承ではなく集約で再実装する（mixin とかデコレーターとか）
export abstract class RegularlyMovingPiece extends Piece {
  abstract moveDirections(): MoveDirection[];

  movablePositionsFrom(offset: Position): Position[] {
    return this.moveDirections()
      .map((moveDirection) => {
        const positionsGetter = movablePositionsGetterFor(
          this.color == 'White' ? moveDirection : reverseOf(moveDirection)
        );
        return positionsGetter(offset);
      })
      .flat();
  }

  attackablePositionsFrom(offset: Position): Position[] {
    return this.movablePositionsFrom(offset);
  }
}
