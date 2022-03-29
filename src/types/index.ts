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
