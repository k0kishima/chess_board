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
  FEN,
  File,
  PieceSymbolOfFEN,
  Rank,
} from '@/types';

const INDEX_AT_EXTENSION_PART = {
  EN_PASSANTABLE_POSITION: 2,
} as const;

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

export const parsePiecePlacement = (fen: FEN): [Position, Piece][] => {
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

export const parseActiveColor = (fen: FEN): Color => {
  const extensionParts = parseExtensionParts(fen);
  const [colorSymbol] = extensionParts;
  if (typeof colorSymbol === 'string') {
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

export const parseEnPassantablePosition = (fen: FEN): Position | null => {
  const extensionParts = parseExtensionParts(fen);
  const positionString =
    extensionParts[INDEX_AT_EXTENSION_PART.EN_PASSANTABLE_POSITION];
  if (positionString === '-') {
    return null;
  }
  const [file, rank] = positionString.split('');
  // TODO: 型をちゃんと絞る
  // これだと file が 'z' とか rank が 9 とかでもエラーにならない
  // typeof だと プリミティブな型でしか絞れない
  // 通常の用途でそういったものが混入することはないので劣後するが対応自体は行う
  return new Position(file as File, parseInt(rank) as Rank);
};

const parseExtensionParts = (fen: FEN): string[] => {
  const [, ...extensionPart] = fen.split(' ');
  if (!extensionPart) {
    throw new Error('Given FEN may not have extension part.');
  }
  return extensionPart;
};
