import { Board, Piece, Position } from '@/entities';
import { Color, FEN, File, Rank } from '@/types';
import { FENBuilder } from '@/utils/FENBuilder';
import { FENParser } from '@/utils/FENParser';

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
    const result = board.movePiece(from, to, this.currentGameContext());

    if (result.success && result.gameContext) {
      const { enPassantablePosition } = result.gameContext;

      this._history = [
        ...this._history.slice(0, this._historyOffset + 1),
        this.createFEN(board, enPassantablePosition),
      ];
      this._historyOffset = this._history.length - 1;

      return true;
    } else {
      console.log(result.errorMessage);
      return false;
    }
  }

  currentNoation(): FEN {
    return this._history[this._historyOffset];
  }

  currentActiveColor(): Color {
    const parser = new FENParser(this.currentNoation());
    return parser.parseActiveColor();
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

  currentGameContext() {
    const parser = new FENParser(this.currentNoation());
    return {
      enPassantablePosition: parser.parseEnPassantablePosition(),
    };
  }
}
