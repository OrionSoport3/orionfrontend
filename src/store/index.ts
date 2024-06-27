import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Api } from '../services/Api';
import { toast } from 'sonner';

interface IUser {
    id: number,
    email: string,
    name: string,
}

interface AuthState {
    token: string | null;
    user: null | IUser;
    isLogged: boolean;
    isLoading: boolean
}

const initialState: AuthState = {
    token: null,
    user: null,
    isLogged: false,
    isLoading: false,
};

export const loginUser = createAsyncThunk('/auth/loginUsers', async (data: any, { rejectWithValue }) => {
    try {
        const response = await Api.post('auth/login', data);

        switch (response.statusCode) {
            case 200: 
                return response.data;
            case 401:
                toast.error('No existe un usuario con los datos proporcionados');
                return rejectWithValue({ message: 'Unauthorized' });
            case 422:
                toast.error('El usuario y/o contraseña no son correctos');
                return rejectWithValue({ message: 'Invalid credentials' });
            default:
                throw new Error("Error");
        }
    } catch (error) {
        console.error('Error occurred during login:', error);
        throw error;
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLogged = false;
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLogged = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
        })
        .addCase(loginUser.rejected, (state) => {
            state.isLoading = false;
            state.isLogged = false;
            state.token = null;
            state.user = null;
        })
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
