import { Color, FEN, File, Rank, ALL_FILES, ALL_RANKS } from '@/types';
import { Board, Position } from '@/entities';

export class FENBuilder {
  _piecePart: string | null;
  _activeColor: Color | null;
  _enPassantablePosition: Position | null;

  constructor() {
    this._piecePart = null;
    this._activeColor = null;
    this._enPassantablePosition = null;
  }

  FEN(): FEN {
    if (!this._piecePart) {
      throw new Error('Piece part have not parsed.');
    }
    if (!this._activeColor) {
      throw new Error('Piece part have not parsed.');
    }
    // TODO: キャスリングのパートを実装する
    return [
      this._piecePart,
      this._activeColor == 'White' ? 'w' : 'b',
      '-',
      this._enPassantablePosition
        ? this._enPassantablePosition.toString()
        : '-',
    ].join(' ');
  }

  addPiecePart(board: Board) {
    this._piecePart = this._parseBoard(board);
  }

  addActiveColor(color: Color) {
    this._activeColor = color;
  }

  addEnPassantablePosition(position: Position | null) {
    this._enPassantablePosition = position;
  }

  _parseBoard(board: Board) {
    const reversedAllRanks = [...ALL_RANKS].reverse();
    const allFiles = [...ALL_FILES];

    return reversedAllRanks
      .map((rank: Rank) => {
        const piecesOfRanks = allFiles.map((file: File) => {
          return board.pieces[file][rank];
        });

        const chars: (string | number)[] = [];
        let blank = 0;
        piecesOfRanks.map((piece) => {
          if (piece) {
            if (blank > 0) {
              chars.push(blank);
              blank = 0;
            }
            chars.push(piece.toSymbol());
          } else {
            blank++;
          }
        });

        if (blank > 0) {
          chars.push(blank);
        }

        return chars.join('');
      })
      .join('/');
  }
}