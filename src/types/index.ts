import {
  File,
  King,
  Piece,
  Position,
  Rank,
  Queen,
} from '@official-sashimi/chess-models';
export { isFenFormatString } from './guards';

export const ALL_WHITE_PIECE_SYMBOLS_OF_FEN = [
  'B',
  'K',
  'P',
  'N',
  'R',
  'Q',
] as const;
export const ALL_BLACK_PIECE_SYMBOLS_OF_FEN = [
  'b',
  'k',
  'p',
  'n',
  'r',
  'q',
] as const;
export const ALL_PIECE_SYMBOLS_OF_FEN = [
  ...ALL_WHITE_PIECE_SYMBOLS_OF_FEN,
  ...ALL_BLACK_PIECE_SYMBOLS_OF_FEN,
] as const;
export type PieceSymbolOfFEN = typeof ALL_PIECE_SYMBOLS_OF_FEN[number];

declare const fenNominality: unique symbol;
export type FenFormatString = string & { [fenNominality]: never };

// eslint-disable-next-line no-unused-vars
export type PositionedPieces = { [k in File]?: { [k in Rank]?: Piece } };

export type PieceAction = (
  piecePlacement: PositionedPieces,
  from: Position,
  to: Position,
  castlingableSides?: Set<King | Queen>
) => PositionedPieces;
