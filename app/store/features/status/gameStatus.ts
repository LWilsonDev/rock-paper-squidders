import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GAME_STATUS} from '../../../components/Firebase/types';
import {RootState} from '../../store';

interface GameStatusState {
  value: GAME_STATUS;
}

const initialState: GameStatusState = {
  value: GAME_STATUS.UNAUTHENTICATED,
};

export const gameStatusSlice = createSlice({
  name: 'gameStatus',

  initialState,
  reducers: {
    changeStatus: (state, action: PayloadAction<GAME_STATUS>) => {
      return {
        ...state,
        value: action.payload,
      };
    },
  },
});

export const {changeStatus} = gameStatusSlice.actions;

export const selectGameStatus = (state: RootState) => state.gameStatus.value;

export default gameStatusSlice.reducer;
