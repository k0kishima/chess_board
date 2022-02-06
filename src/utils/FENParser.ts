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
  CastlingMovement,
  Color,
  FEN,
  File,
  KingDestination,
  PieceSymbolOfFEN,
  Rank,
} from '@/types';

const INDEX_AT_EXTENSION_PART = {
  CASTLINGABLE_FLAG: 1,
  EN_PASSANTABLE_POSITION: 2,
} as const;

export class FENParser {
  _fen: FEN;

  constructor(fen: FEN) {
    this._fen = fen;
  }

  parsePiecePlacement(): [Position, Piece][] {
    const [piecePlacement] = this._fen.split(' ');
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
              this._createPieceFromSymbol(symbol as PieceSymbolOfFEN),
            ],
          ];
          fileOffset += 1;
        } else {
          fileOffset += parseInt(symbol);
        }
      });
    });

    return positionAndPieces;
  }

  parseActiveColor(): Color {
    const extensionParts = this._parseExtensionParts();
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
  }

  parseCastlingPosition(): CastlingMovement {
    const extensionParts = this._parseExtensionParts();
    const symbols = extensionParts[INDEX_AT_EXTENSION_PART.CASTLINGABLE_FLAG];
    if (symbols === '-') {
      return {};
    }

    const castlingMovement: CastlingMovement = {};
    symbols.split('').forEach((symbol) => {
      switch (symbol) {
        case 'K':
          castlingMovement[String(new Position('g', 1)) as KingDestination] = {
            from: new Position('h', 1),
            destination: new Position('f', 1),
          };
          break;
        case 'Q':
          castlingMovement[String(new Position('b', 1)) as KingDestination] = {
            from: new Position('a', 1),
            destination: new Position('c', 1),
          };
          break;
        case 'k':
          castlingMovement[String(new Position('g', 8)) as KingDestination] = {
            from: new Position('h', 8),
            destination: new Position('f', 8),
          };
          break;
        case 'q':
          castlingMovement[String(new Position('b', 8)) as KingDestination] = {
            from: new Position('a', 8),
            destination: new Position('c', 8),
          };
          break;
        default:
          throw new Error('The castlingable symbol is invalid format.');
      }
    });

    return castlingMovement;
  }

  parseEnPassantablePosition(): Position | null {
    const extensionParts = this._parseExtensionParts();
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
  }

  _createPieceColorFromSymbol(pieceSymbol: PieceSymbolOfFEN): Color {
    return new Set<string>(ALL_WHITE_PIECE_SYMBOLS_OF_FEN).has(pieceSymbol)
      ? 'White'
      : 'Black';
  }

  // TODO
  // 記号からPieceのサブクラスを返す関数を作る
  // それと記号から色を返す関数と組み合わせて利用する
  // みたいに処理を切り出したい
  _createPieceFromSymbol(pieceSymbol: PieceSymbolOfFEN): Piece {
    const color = this._createPieceColorFromSymbol(pieceSymbol);
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
  }

  _parseExtensionParts(): string[] {
    const [, ...extensionPart] = this._fen.split(' ');
    if (!extensionPart) {
      throw new Error('Given FEN may not have extension part.');
    }
    return extensionPart;
  }
}
