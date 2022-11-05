import type { PayloadAction } from '@reduxjs/toolkit';
import { configureStore, createSlice } from '@reduxjs/toolkit';

interface AccountState {
  accountId: string;
  email: string;
  firstName: string;
  lastName: string;
}
const initialAccountState: AccountState = {
  accountId: '',
  email: '',
  firstName: '',
  lastName: '',
};

const accountSlice = createSlice({
  name: 'account',
  initialState: initialAccountState,
  reducers: {
    setAccount(state, action: PayloadAction<AccountState>) {
      state.accountId = action.payload.accountId;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
  },
});

const store = configureStore({
  reducer: { account: accountSlice.reducer },
});

export const accountActions = accountSlice.actions;

export default store;
