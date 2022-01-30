import { FEN, File, Rank, ALL_FILES, ALL_RANKS } from '@/types';
import { Board, Position } from '@/entities';

export class FENBuilder {
  _piecePart: string | null;
  _activeColorPart: 'w' | 'b' | null;

  constructor() {
    this._piecePart = null;
    this._activeColorPart = null;
  }

  FEN(): FEN {
    if (!this._piecePart) {
      throw new Error('Piece part have not parsed.');
    }
    if (!this._activeColorPart) {
      throw new Error('Piece part have not parsed.');
    }
    return [this._piecePart, this._activeColorPart].join(' ');
  }

  addPiecePart(board: Board) {
    this._piecePart = this._parseBoard(board);
  }

  addActiveColor(color: 'w' | 'b') {
    this._activeColorPart = color;
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
