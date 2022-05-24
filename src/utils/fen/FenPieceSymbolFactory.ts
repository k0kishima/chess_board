import {
  Piece,
  Pawn,
  Rook,
  Knight,
  Bishop,
  King,
  Queen,
} from '@official-sashimi/chess-models';

import { PieceSymbolOfFEN } from '@/types';

export class FenPieceSymbolFactory {
  static create(piece: Piece): PieceSymbolOfFEN {
    switch (true) {
      case piece instanceof Pawn:
        return piece.color == 'White' ? 'P' : 'p';
      case piece instanceof Rook:
        return piece.color == 'White' ? 'R' : 'r';
      case piece instanceof Knight:
        return piece.color == 'White' ? 'N' : 'n';
      case piece instanceof Bishop:
        return piece.color == 'White' ? 'B' : 'b';
      case piece instanceof King:
        return piece.color == 'White' ? 'K' : 'k';
      case piece instanceof Queen:
        return piece.color == 'White' ? 'Q' : 'q';
      default:
        throw new Error();
    }
  }
}
