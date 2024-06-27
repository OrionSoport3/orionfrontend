import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedUsersState {
    selectedUsers: string[];
}

const initialState: SelectedUsersState = {
    selectedUsers: [],
};

const selectedUsersSlice = createSlice({
    name: 'selectedUsers',
    initialState,
    reducers: {
        addSelectedUser: (state, action: PayloadAction<string>) => {
            if (!state.selectedUsers.includes(action.payload)) {
                state.selectedUsers.push(action.payload);
            }
        },
        removeSelectedUser: (state, action: PayloadAction<string>) => {
            state.selectedUsers = state.selectedUsers.filter(user => user !== action.payload);
        },
        clearSelectedUsers: (state) => {
            state.selectedUsers = [];
        },
    },
});

export const { addSelectedUser, removeSelectedUser, clearSelectedUsers } = selectedUsersSlice.actions;
export default selectedUsersSlice.reducer;
