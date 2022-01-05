import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store';

interface UserState {
  id: string;
  username: string;
  isHost: boolean;
  number: number;
  currentGameId?: string | number[];
}

const initialState: UserState = {
  id: '',
  username: '',
  isHost: false,
  number: 0,
  currentGameId: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {changeUser} = userSlice.actions;

export const selectUserInfo = (state: RootState) => state.user;

export default userSlice.reducer;
