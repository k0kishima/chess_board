import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { File, Rank } from '@/types';
import { Board, Piece, Position } from '@/entities';

const initialFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';

export type State = {
  frameHexColor: string;
  whiteSquareHexColor: string;
  blackSquareHexColor: string;
  history: string[];
  historyOffset: number;
  pieces: { [k in File]: { [k in Rank]: Piece | null } };
  selectingPosition?: Position;
};

export const initialState: State = {
  frameHexColor: '#333',
  whiteSquareHexColor: '#eee',
  blackSquareHexColor: '#555',
  history: [initialFEN],
  historyOffset: 0,
  pieces: new Board(initialFEN).pieces,
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
        const fen = state.history[state.historyOffset];
        const board = new Board(fen);
        board.movePiece(state.selectingPosition, position);

        state.history.push(board.toFEN());
        state.historyOffset += 1;
        state.pieces = board.pieces;
        state.selectingPosition = undefined;
        return state;
      } else {
        state.selectingPosition = position;
        return state;
      }
    },
    undoMovePiece: (state) => {
      state.historyOffset -= 1;
      const fen = state.history[state.historyOffset];
      const board = new Board(fen);
      state.pieces = board.pieces;
      return state;
    },
    redoMovePiece: (state) => {
      state.historyOffset += 1;
      const fen = state.history[state.historyOffset];
      const board = new Board(fen);
      state.pieces = board.pieces;
      return state;
    },
  },
});

export const actions = boardSlice.actions;
export default boardSlice.reducer;
