import { combineReducers } from 'redux';
import boardReducer from '@/features/board/stores';

const rootReducer = combineReducers({
  board: boardReducer,
});

export default rootReducer;
