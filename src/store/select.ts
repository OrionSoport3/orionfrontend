import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
  id: number;
  name: string;
  departamento: string;
  isSelected: boolean;
}

interface SelectionState {
  items: Item[];
}

const initialState: SelectionState = {
  items: [],
};

const selectionSlice = createSlice({
  name: 'select',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setItems } = selectionSlice.actions;
export default selectionSlice.reducer;
