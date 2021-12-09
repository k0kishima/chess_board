import {
  PieceSymbolOfFEN,
  ALL_WHITE_PIECE_SYMBOLS_OF_FEN,
  Color,
} from '@/types';

export class ColorFactory {
  static create(pieceSymbol: PieceSymbolOfFEN): Color {
    return ALL_WHITE_PIECE_SYMBOLS_OF_FEN.includes(pieceSymbol)
      ? 'White'
      : 'Black';
  }
}
