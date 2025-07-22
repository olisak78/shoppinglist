import { configureStore } from '@reduxjs/toolkit';
import shoppingListSlice from './shoppingListSlice';

export const store = configureStore({
  reducer: {
    shoppingList: shoppingListSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
