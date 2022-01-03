import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type State = {
  frameHexColor: string;
  whiteSquareHexColor: string;
  blackSquareHexColor: string;
};

export const initialState: State = {
  frameHexColor: '#000',
  whiteSquareHexColor: '#fff',
  blackSquareHexColor: '#111',
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
});

export const actions = boardSlice.actions;
export default boardSlice.reducer;
