import { Piece } from './Piece';
import { Position } from './Position';

export class Bishop extends Piece {
  movablePositionsFrom(currentPosition: Position): Position[] {
    return [Position.allDiagonalsFrom(currentPosition)]
      .flat()
      .filter((position) => {
        const distance = currentPosition.distanceFrom(position);
        return distance.file > 0 || distance.rank > 0;
      });
  }

  attackablePositionsFrom(currentPosition: Position): Position[] {
    return this.movablePositionsFrom(currentPosition);
  }
}
