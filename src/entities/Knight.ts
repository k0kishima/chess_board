import { Piece } from './Piece';
import { Position } from './Position';

export class Knight extends Piece {
  movablePositionsFrom(currentPosition: Position): Position[] {
    return Position.all().filter((position) => {
      const distance = currentPosition.distanceFrom(position);
      return (
        (distance.file === 1 && distance.rank === 2) ||
        (distance.file === 2 && distance.rank === 1)
      );
    });
  }

  attackablePositionsFrom(currentPosition: Position): Position[] {
    return this.movablePositionsFrom(currentPosition);
  }

  toSymbol() {
    return this.color == 'White' ? 'N' : 'n';
  }
}
