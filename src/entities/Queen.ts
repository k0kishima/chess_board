import { Piece } from './Piece';
import { Position } from './Position';

export class Queen extends Piece {
  movablePositionsFrom(currentPosition: Position): Position[] {
    return [
      Position.allOfFile(currentPosition.file),
      Position.allOfRank(currentPosition.rank),
      Position.allDiagonalsFrom(currentPosition),
    ]
      .flat()
      .filter((position) => {
        const distance = currentPosition.distanceFrom(position);
        return distance.file > 0 || distance.rank > 0;
      });
  }

  attackablePositionsFrom(currentPosition: Position): Position[] {
    return this.movablePositionsFrom(currentPosition);
  }

  toSymbol() {
    return this.color == 'White' ? 'Q' : 'q';
  }
}
