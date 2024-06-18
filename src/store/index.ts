import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    user: boolean;
}

const initialState: AuthState = {
    token: null,
    user: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ token: string, user: any }>) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.token = null;
            state.user = false;
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
