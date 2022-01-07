import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type State = {
  frameHexColor: string;
  whiteSquareHexColor: string;
  blackSquareHexColor: string;
  history: string[];
};

export const initialState: State = {
  frameHexColor: '#333',
  whiteSquareHexColor: '#eee',
  blackSquareHexColor: '#555',
  history: ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'],
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
});

export const actions = boardSlice.actions;
export default boardSlice.reducer;
