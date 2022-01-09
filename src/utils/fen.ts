import {
  Bishop,
  King,
  Knight,
  Pawn,
  Position,
  Piece,
  Queen,
  Rook,
} from '@/entities';
import {
  ALL_FILES,
  ALL_RANKS,
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

export const parsePiecePlacement = (fen: string): [Position, Piece][] => {
  const [piecePlacement] = fen.split(' ');
  const ranks = piecePlacement.split('/');
  const allFiles = [...ALL_FILES];
  const reversedAllRanks = [...ALL_RANKS].reverse();

  if (ranks.length !== 8) {
    throw new Error('Probably given string is not valid FEN format');
  }

  let positionAndPieces: [Position, Piece][] = [];
  ranks.forEach((rank: string, rankOffset: number) => {
    if (!rank.match(/^[BbKkNnPpQqRr1-8]{1,8}$/)) {
      throw new Error('Probably given string is not valid FEN format');
    }

    let fileOffset = 0;
    rank.split('').forEach((symbol: string) => {
      if (isNaN(parseInt(symbol))) {
        positionAndPieces = [
          ...positionAndPieces,
          [
            new Position(allFiles[fileOffset], reversedAllRanks[rankOffset]),
            createPieceFromSymbol(symbol as PieceSymbolOfFEN),
          ],
        ];
        fileOffset += 1;
      } else {
        fileOffset += parseInt(symbol);
      }
    });
  });

  return positionAndPieces;
};

export const parseActiveColor = (fen: string): Color => {
  const [, extensionPart] = fen.split(' ');
  if (!extensionPart) {
    throw new Error('Given FEN may not have extension part.');
  }
  const [colorSymbol] = extensionPart.split(' ');
  if (typeof colorSymbol === 'string') {
    console.log('color symbol', colorSymbol);
    switch (colorSymbol) {
      case 'w':
        return 'White';
      case 'b':
        return 'Black';
      default:
    }
  }
  throw new Error('The color symbol is invalid format.');
};
