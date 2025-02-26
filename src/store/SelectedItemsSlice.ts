// src/store/SelectedItemsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedItem {
  name: string;
  description: string;
  url: string;
}

interface SelectedItemsState {
  items: SelectedItem[];
}

const initialState: SelectedItemsState = {
  items: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    addSelectedItem: (state, action: PayloadAction<SelectedItem>) => {
      state.items.push(action.payload);
    },
    removeSelectedItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
    },
    unselectAll: (state) => {
      state.items = [];
    },
    toggleItem: (state, action: PayloadAction<SelectedItem>) => {
      const index = state.items.findIndex(item => item.name === action.payload.name);
      if (index >= 0) {
        state.items.splice(index, 1); // Remove if already selected
      } else {
        state.items.push(action.payload); // Add if not selected
      }
    },
  },
});

export const { addSelectedItem, removeSelectedItem, unselectAll, toggleItem } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;