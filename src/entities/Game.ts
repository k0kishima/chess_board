import { Board, Piece, Position } from '@/entities';
import { Color, FEN, File, Rank } from '@/types';
import { parseActiveColor } from '@/utils/fen';
import { FENBuilder } from '@/utils/FENBuilder';

export const INITIAL_FEN =
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export class Game {
  _history: FEN[];
  _historyOffset: number;

  constructor() {
    this._history = [INITIAL_FEN];
    this._historyOffset = 0;
  }

  pieces(): { [k in File]: { [k in Rank]: Piece | null } } {
    return new Board(this.currentNoation()).pieces;
  }

  movePiece(from: Position, to: Position) {
    const board = new Board(this.currentNoation());
    // FIXME
    // Borad#movePiece の前に呼び出さなければいけないとか順序関係を持ってしまっているのが最悪
    const enPassantablePosition = board.getEnPassantablePositionFromMove(
      from,
      to
    );
    board.movePiece(from, to);
    this._history = [
      ...this._history.slice(0, this._historyOffset + 1),
      // TODO: FENのビルダーを実装する
      this.createFEN(board, enPassantablePosition),
    ];
    this._historyOffset = this._history.length - 1;
    return true;
  }

  currentNoation(): FEN {
    return this._history[this._historyOffset];
  }

  currentActiveColor(): Color {
    return parseActiveColor(this.currentNoation());
  }

  nextActiveColor(): Color {
    return this.currentActiveColor() == 'White' ? 'Black' : 'White';
  }

  undoable(): boolean {
    return this._historyOffset > 0;
  }

  undo() {
    if (this.undoable()) {
      this._historyOffset -= 1;
      return true;
    }
    throw new Error('Cannot undo.');
  }

  redoable(): boolean {
    return this._historyOffset < this._history.length - 1;
  }

  redo() {
    if (this.redoable()) {
      this._historyOffset += 1;
      return true;
    }
    throw new Error('Cannot redo.');
  }

  createFEN(board: Board, enPassantablePosition: Position | null) {
    const builder = new FENBuilder();
    builder.addPiecePart(board);
    builder.addActiveColor(this.nextActiveColor());
    builder.addEnPassantablePosition(enPassantablePosition);
    return builder.FEN();
  }
}
