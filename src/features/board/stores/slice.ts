import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { File, Rank } from '@/types';
import { Board, Game, Piece, Position } from '@/entities';

const game = new Game();

export type State = {
  frameHexColor: string;
  whiteSquareHexColor: string;
  blackSquareHexColor: string;
  game: Game;
  pieces: { [k in File]: { [k in Rank]: Piece | null } };
  enableMovementValidation: boolean;
  selectingPosition?: Position;
};

export const initialState: State = {
  frameHexColor: '#333',
  whiteSquareHexColor: '#eee',
  blackSquareHexColor: '#555',
  game: game,
  pieces: new Board(game.currentNoation()).pieces,
  enableMovementValidation: false,
  selectingPosition: undefined,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    reset(state) {
      state = initialState;
      return state;
    },
    resetPositionSelection(state) {
      state.selectingPosition = undefined;
      return state;
    },
    selectPosition(state, action: PayloadAction<{ position: Position }>) {
      const { position } = action.payload;

      if (state.selectingPosition) {
        return state;
      }

      const board = new Board(state.game.currentNoation());
      const piece = board.pieces[position.file][position.rank];
      if (piece && piece.color == state.game.currentActiveColor()) {
        state.selectingPosition = position;
        return state;
      }
      return state;
    },
    movePiece(state, action: PayloadAction<{ from: Position; to: Position }>) {
      const { from, to } = action.payload;
      const board = new Board(state.game.currentNoation());
      board.movePiece(from, to, state.enableMovementValidation);
      // TODO: FENのビルダーを実装する
      state.game.pushHistory(
        `${board.toFEN()} ${state.game.nextActiveColorSymbol()}`
      );
      state.pieces = board.pieces;
      state.selectingPosition = undefined;
      return state;
    },
    undoMovePiece: (state) => {
      state.game.historyOffset -= 1;
      const board = new Board(state.game.currentNoation());
      state.pieces = board.pieces;
      return state;
    },
    redoMovePiece: (state) => {
      state.game.historyOffset += 1;
      const board = new Board(state.game.currentNoation());
      state.pieces = board.pieces;
      return state;
    },
  },
});

export const actions = boardSlice.actions;
export default boardSlice.reducer;
