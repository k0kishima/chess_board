import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Color, File, Rank } from '@/types';
import { Board, Piece, Position } from '@/entities';

const initialFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export type State = {
  frameHexColor: string;
  whiteSquareHexColor: string;
  blackSquareHexColor: string;
  history: string[];
  historyOffset: number;
  pieces: { [k in File]: { [k in Rank]: Piece | null } };
  enableMovementValidation: boolean;
  selectingPosition?: Position;
  activeColor: Color;
};

export const initialState: State = {
  frameHexColor: '#333',
  whiteSquareHexColor: '#eee',
  blackSquareHexColor: '#555',
  history: [initialFEN],
  historyOffset: 0,
  pieces: new Board(initialFEN).pieces,
  enableMovementValidation: false,
  selectingPosition: undefined,
  activeColor: 'White',
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
      const fen = state.history[state.historyOffset];
      const board = new Board(fen);

      if (state.selectingPosition) {
        board.movePiece(
          state.selectingPosition,
          position,
          state.enableMovementValidation
        );
        state.history.push(board.toFEN());
        state.historyOffset += 1;
        state.pieces = board.pieces;
        state.selectingPosition = undefined;
        state.activeColor = state.activeColor == 'White' ? 'Black' : 'White';
        return state;
      } else {
        const piece = board.pieces[position.file][position.rank];
        if (piece && piece.color == state.activeColor) {
          state.selectingPosition = position;
          return state;
        }
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
