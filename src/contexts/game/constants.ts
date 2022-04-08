import {
  Bishop,
  Color,
  King,
  Knight,
  Pawn,
  Position,
  Rook,
  Queen,
} from '@official-sashimi/chess-models';

import { PositionedPieces } from '@/types';

type State = {
  piecePlacement: PositionedPieces;
  activeColor: Color;
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
  piecePlacement: {
    a: {
      1: new Rook('White'),
      2: new Pawn('White'),
      7: new Pawn('Black'),
      8: new Rook('Black'),
    },
    b: {
      1: new Knight('White'),
      2: new Pawn('White'),
      7: new Pawn('Black'),
      8: new Knight('Black'),
    },
    c: {
      1: new Bishop('White'),
      2: new Pawn('White'),
      7: new Pawn('Black'),
      8: new Bishop('Black'),
    },
    d: {
      1: new Queen('White'),
      2: new Pawn('White'),
      7: new Pawn('Black'),
      8: new Queen('Black'),
    },
    e: {
      1: new King('White'),
      2: new Pawn('White'),
      7: new Pawn('Black'),
      8: new King('Black'),
    },
    f: {
      1: new Bishop('White'),
      2: new Pawn('White'),
      7: new Pawn('Black'),
      8: new Bishop('Black'),
    },
    g: {
      1: new Knight('White'),
      2: new Pawn('White'),
      7: new Pawn('Black'),
      8: new Knight('Black'),
    },
    h: {
      1: new Rook('White'),
      2: new Pawn('White'),
      7: new Pawn('Black'),
      8: new Rook('Black'),
    },
  },
  activeColor: 'White',
  castlingablePositions: [],
  enPassantablePositions: [],
  halfmoveClockNumber: 0,
  numberOfTheFullmove: 0,
  selectingPosition: undefined,
  selectSquare: (position) => {
    return true;
  },
};
