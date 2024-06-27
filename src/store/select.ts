import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
    name: string;
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
        select: (state, action: PayloadAction<string>) => {
            const item = state.items.find(item => item.name === action.payload);
            if (item) {
                item.isSelected = !item.isSelected;

                if (item.isSelected) {
                } else {
                }
            }
        },
    },
});

export const { select } = selectionSlice.actions;
export default selectionSlice.reducer;
