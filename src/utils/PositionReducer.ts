import { Board, Piece, Position, RegularlyMovingPiece } from '@/entities';
import { MoveDirection } from '@/types';
import { movablePositionsGetterFor, reverseOf } from '@/utils/PieceMovement';
import { PositionComparer } from '@/utils/PositionComparer';

export class PositionReducerFactory {
  static create(board: Board, piece: Piece, offset: Position) {
    if (piece instanceof RegularlyMovingPiece) {
      return new RegularlyMovingPiecePositionReducer(board, piece, offset);
    }
    return new DummyReducer(board, piece, offset);
  }
}

abstract class PositionReducer {
  readonly board: Board;
  readonly piece: Piece;
  readonly offset: Position;

  constructor(board: Board, piece: Piece, offset: Position) {
    this.board = board;
    this.piece = piece;
    this.offset = offset;
  }

  abstract reduce(positions: Position[]): Position[];
}

export class RegularlyMovingPiecePositionReducer extends PositionReducer {
  readonly piece!: RegularlyMovingPiece;

  reduce(positions: Position[]): Position[] {
    const notMovablePositionStrings = this.notMovablePosition().map(
      (position) => position.toString()
    );
    return positions.filter(
      (position) => !notMovablePositionStrings.includes(position.toString())
    );
  }

  notMovablePosition(): Position[] {
    return this.piece
      .moveDirections()
      .map((direction) => {
        const fixedDirection =
          this.piece.color == 'White' ? direction : reverseOf(direction);
        const preventer = this.detectPreventer(fixedDirection);
        if (preventer === null) {
          return [];
        }

        const positionComparer = new PositionComparer(
          this.piece.color,
          direction
        );
        const positionsGetter = movablePositionsGetterFor(fixedDirection);
        const positions = positionsGetter(this.offset).sort(
          positionComparer.getCompareFunction()
        );
        const [preventerPosition] = preventer;

        const boundaryIndex = positions
          .map((p) => p.toString())
          .indexOf(preventerPosition.toString());
        return positions.slice(boundaryIndex);
      })
      .flat();
  }

  detectPreventer(direction: MoveDirection): [Position, Piece] | null {
    const positionsGetter = movablePositionsGetterFor(direction);
    const movablePositions = positionsGetter(this.offset);

    const positionOfPreventer = movablePositions.find(
      (position) => this.board.pieces[position.file][position.rank]
    );
    if (positionOfPreventer instanceof Position) {
      const piece =
        this.board.pieces[positionOfPreventer.file][positionOfPreventer.rank];
      if (piece instanceof Piece) {
        return [positionOfPreventer, piece];
      }
    }
    return null;
  }
}

class DummyReducer extends PositionReducer {
  reduce(positions: Position[]): Position[] {
    return positions;
  }
}
