import { King, Position, Rook } from '@/entities';

export type Color = 'White' | 'Black';

export type FEN = string;

export const ALL_FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;
export type File = typeof ALL_FILES[number];

export const ALL_RANKS = [1, 2, 3, 4, 5, 6, 7, 8] as const;
export type Rank = typeof ALL_RANKS[number];

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

export type PieceMoveResult = {
  success: boolean;
  errorMessage?: string;
  gameContext?: GameContext;
};

export type GameContext = {
  enPassantablePosition: Position | null;
  castlingablePieces: CastlingMovement;
};

export type KingDestination = 'b1' | 'b8' | 'g1' | 'g8';
export type RookMovement = { from: Position; destination: Position };
export type CastlingMovement = {
  [key in KingDestination]?: RookMovement;
};
