import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { parsePiecePlacement } from '@/utils/fen';
import { File, Rank } from '@/types';
import { Board, Piece } from '@/entities';

const initialFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';

// TODO: ファクトリクラス化を検討
const createBoard = (fen: string) => {
  const board = new Board();
  parsePiecePlacement(fen).map((tuple) => {
    const [position, piece] = tuple;
    board.put(position, piece);
  });
  return board;
};

export type State = {
  frameHexColor: string;
  whiteSquareHexColor: string;
  blackSquareHexColor: string;
  history: string[];
  historyOffset: number;
  pieces: { [k in File]: { [k in Rank]: Piece | null } };
};

export const initialState: State = {
  frameHexColor: '#333',
  whiteSquareHexColor: '#eee',
  blackSquareHexColor: '#555',
  history: [initialFEN],
  historyOffset: 0,
  pieces: createBoard(initialFEN).pieces,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
});

export const actions = boardSlice.actions;
export default boardSlice.reducer;
