import { Bishop, King, Knight, Pawn, Piece, Queen, Rook } from '@/entities';
import {
  ALL_WHITE_PIECE_SYMBOLS_OF_FEN,
  Color,
  PieceSymbolOfFEN,
} from '@/types';

export const createPieceColorFromSymbol = (
  pieceSymbol: PieceSymbolOfFEN
): Color => {
  return new Set<string>(ALL_WHITE_PIECE_SYMBOLS_OF_FEN).has(pieceSymbol)
    ? 'White'
    : 'Black';
};

// TODO
// 記号からPieceのサブクラスを返す関数を作る
// それと記号から色を返す関数と組み合わせて利用する
// みたいに処理を切り出したい
export const createPieceFromSymbol = (pieceSymbol: PieceSymbolOfFEN): Piece => {
  const color = createPieceColorFromSymbol(pieceSymbol);
  switch (pieceSymbol) {
    case 'B':
    case 'b':
      return new Bishop(color);
    case 'K':
    case 'k':
      return new King(color);
    case 'N':
    case 'n':
      return new Knight(color);
    case 'P':
    case 'p':
      return new Pawn(color);
    case 'Q':
    case 'q':
      return new Queen(color);
    case 'R':
    case 'r':
      return new Rook(color);
  }
};
