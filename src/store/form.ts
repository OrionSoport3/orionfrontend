import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../services/Api';

interface Item {
    name: string;
    isSelected: boolean;
}

interface IsSelectedState {
    items: Item[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: IsSelectedState = {
    items: [],
    status: 'idle',
    error: null,
};

export const fetchUsers = createAsyncThunk('select/fetchUsers', async () => {
    const response = await Api.getUser('get');
    return response.data.user.map((user: any) => ({
        name: user.name,
        isSelected: false,
    }));
});

const IsSelectedSlice = createSlice({
    name: 'select',
    initialState,
    reducers: {
        select: (state, action: PayloadAction<string>) => {
            const item = state.items.find(item => item.name === action.payload);
            if (item) {
                item.isSelected = !item.isSelected;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<Item[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch users';
            });
    },
});

export const { select } = IsSelectedSlice.actions;
export default IsSelectedSlice.reducer;
