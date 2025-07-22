import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ShoppingItem {
  category: string;
  product: string;
  quantity: number;
}

interface ShoppingListState {
  items: ShoppingItem[];
}

const initialState: ShoppingListState = {
  items: [],
};

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ShoppingItem>) => {
      const { category, product, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.category === category && item.product === product
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (
      state,
      action: PayloadAction<{ category: string; product: string }>
    ) => {
      state.items = state.items.filter(
        (item) =>
          !(
            item.category === action.payload.category &&
            item.product === action.payload.product
          )
      );
    },
    clearItems: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearItems } = shoppingListSlice.actions;
export default shoppingListSlice.reducer;
