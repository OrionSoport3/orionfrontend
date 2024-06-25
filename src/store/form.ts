import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
    name: string;
    isSelected: boolean;
}

interface IsSelectedState {
    items: Item[];
  }
  
  const initialState: IsSelectedState = {
    items: [
      { name: 'Eddie', isSelected: false },
      { name: 'Edd', isSelected: false },
      { name: 'Ed', isSelected: false },
    ]
  };

const IsSelectedSlice = createSlice({
    name: 'select',
    initialState,
    reducers: {
        select: (state, action: PayloadAction<string>) => {
        const item = state.items.find(item => item.name === action.payload);
        if (item) {
            item.isSelected = !item.isSelected;
        }
        }
    }
});

export const {select} = IsSelectedSlice.actions
export default IsSelectedSlice.reducer