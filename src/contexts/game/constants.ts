import {
  Bishop,
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
  // The number of halfmoves since the last capture or pawn advance, used for the fifty-move rule.
  halfmoveClockNumber: number;
  numberOfTheFullmove: number;
  selectingPosition: Position | undefined;
  selectSquare: (position: Position) => void;
};

export const initialState: State = {
  piecePlacement: {},
  halfmoveClockNumber: 0,
  numberOfTheFullmove: 0,
  selectingPosition: undefined,
  selectSquare: (position) => {
    return true;
  },
};

export const initialPiecePlacement = {
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
};
