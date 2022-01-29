import { Piece } from './Piece';
import { Rank } from '@/types';
import { Position } from './Position';

export class InvalidPositionError extends Error {}
export class CannotRankupAnyMore extends Error {}

export class Pawn extends Piece {
  movablePositionsFrom(currentPosition: Position): Position[] {
    this.validatePosition(currentPosition);

    try {
      let positions = [
        new Position(currentPosition.file, this.nextRank(currentPosition.rank)),
      ];
      if (
        (currentPosition.rank === 2 && this.color === 'White') ||
        (currentPosition.rank === 7 && this.color === 'Black')
      ) {
        positions = [
          ...positions,
          new Position(currentPosition.file, this.color === 'White' ? 4 : 5),
        ];
      }
      return positions;
    } catch {
      // TODO: CannotRankupAnyMore 以外の場合の制御を考えて実装する
      return [];
    }
  }

  attackablePositionsFrom(currentPosition: Position): Position[] {
    this.validatePosition(currentPosition);

    try {
      const nextRank = this.nextRank(currentPosition.rank);
      return Position.allOfRank(nextRank).filter((otherPosition) => {
        const distance = currentPosition.distanceFrom(otherPosition);
        return distance.file === 1;
      });
    } catch {
      // TODO: CannotRankupAnyMore 以外の場合の制御を考えて実装する
      return [];
    }
  }

  validatePosition(position: Position): boolean {
    if (position.rank === 1 && this.color === 'White') {
      throw new InvalidPositionError();
    }
    if (position.rank === 8 && this.color === 'Black') {
      throw new InvalidPositionError();
    }

    return true;
  }

  nextRank(currentRank: Rank): Rank {
    const nextRank = currentRank + (this.color === 'White' ? 1 : -1);
    if (nextRank === 0 || nextRank === 9) {
      throw new CannotRankupAnyMore();
    }
    return nextRank as Rank;
  }

  toSymbol() {
    return this.color == 'White' ? 'P' : 'p';
  }
}
