import { Position } from '@official-sashimi/chess-models';
import { PositionedPieces } from '@/types';

type State = {
  piecePlacement: PositionedPieces;
  // TODO: キャスリング実装時に正式対応
  castlingablePositions: Position[];
  // TODO: アンパッサン実装時に正式対応
  enPassantablePositions: Position[];
  // The number of halfmoves since the last capture or pawn advance, used for the fifty-move rule.
  halfmoveClockNumber: number;
  numberOfTheFullmove: number;
  selectingPosition: Position | undefined;
  selectSquare: (position: Position) => void;
};

export const initialState: State = {
  piecePlacement: {},
  castlingablePositions: [],
  enPassantablePositions: [],
  halfmoveClockNumber: 0,
  numberOfTheFullmove: 0,
  selectingPosition: undefined,
  selectSquare: (position) => {
    return true;
  },
};
