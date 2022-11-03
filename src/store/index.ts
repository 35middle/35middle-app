import type { PayloadAction } from '@reduxjs/toolkit';
import { configureStore, createSlice } from '@reduxjs/toolkit';

// export const accountIdAsync = createAsyncThunk('accountId', async () => {
//   const response = await fetch('', {
//     method: 'GET',
//   });
//   const data = await response.json();
//   return data.accountId;
// });

interface AccountState {
  accountId: string;
}
const initialAccountState: AccountState = { accountId: '' };

const accountSlice = createSlice({
  name: 'account',
  initialState: initialAccountState,
  reducers: {
    setAccountId(state, action: PayloadAction<string>) {
      state.accountId = action.payload;
    },
  },
});

const store = configureStore({
  reducer: { account: accountSlice.reducer },
});

export const accountActions = accountSlice.actions;

export default store;
