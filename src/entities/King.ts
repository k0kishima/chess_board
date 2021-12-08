import { Piece } from './Piece';
import { Position } from './Position';

export class King extends Piece {
  movablePositionsFrom(currentPosition: Position): Position[] {
    return Position.all().filter((position) => {
      const distance = currentPosition.distanceFrom(position);
      return (
        distance.file + distance.rank > 0 &&
        distance.file < 2 &&
        distance.rank < 2
      );
    });
  }

  attackablePositionsFrom(currentPosition: Position): Position[] {
    return this.movablePositionsFrom(currentPosition);
  }
}
