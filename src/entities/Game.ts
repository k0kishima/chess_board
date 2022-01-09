import { Color, FEN } from '@/types';
import { parseActiveColor } from '@/utils/fen';

export const INITIAL_FEN =
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export class Game {
  _history: FEN[];
  _historyOffset: number;

  constructor() {
    this._history = [INITIAL_FEN];
    this._historyOffset = 0;
  }

  set historyOffset(offset: number) {
    this._historyOffset = offset;
  }

  get historyOffset() {
    return this._historyOffset;
  }

  historyLength(): number {
    return this._history.length;
  }

  pushHistory(fen: FEN) {
    this._history = [...this._history.slice(this._historyOffset - 1), fen];
    this._historyOffset += 1;
  }

  currentNoation(): FEN {
    return this._history[this.historyOffset];
  }

  currentActiveColor(): Color {
    return parseActiveColor(this.currentNoation());
  }

  currentActiveColorSymbol(): 'w' | 'b' {
    return this.currentActiveColor() == 'White' ? 'w' : 'b';
  }

  nextActiveColor(): Color {
    return this.currentActiveColor() == 'White' ? 'Black' : 'White';
  }

  nextActiveColorSymbol(): 'w' | 'b' {
    return this.currentActiveColor() == 'White' ? 'b' : 'w';
  }
}
