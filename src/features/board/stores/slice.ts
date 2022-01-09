import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Game, Position } from '@/entities';

export type State = {
  frameHexColor: string;
  whiteSquareHexColor: string;
  blackSquareHexColor: string;
  game: Game;
  selectingPosition?: Position;
};

export const initialState: State = {
  frameHexColor: '#333',
  whiteSquareHexColor: '#eee',
  blackSquareHexColor: '#555',
  game: new Game(),
  selectingPosition: undefined,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    reset(state) {
      state = { ...initialState, game: new Game() };
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

      const piece = state.game.pieces()[position.file][position.rank];
      if (piece && piece.color == state.game.currentActiveColor()) {
        state.selectingPosition = position;
        return state;
      }
      return state;
    },
    movePiece(state, action: PayloadAction<{ from: Position; to: Position }>) {
      const { from, to } = action.payload;
      state.game.movePiece(from, to);
      state = { ...state, selectingPosition: undefined, game: state.game };
      return state;
    },
    undoMovePiece: (state) => {
      state.game.undo();
      state = { ...state, game: state.game };
      return state;
    },
    redoMovePiece: (state) => {
      state.game.redo();
      state = { ...state, game: state.game };
      return state;
    },
  },
});

export const actions = boardSlice.actions;
export default boardSlice.reducer;
