import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Api } from "../services/Api"
import { toast } from "sonner"

interface Sucursales {
    id_sucursal: string | number,
    nombre_sucursal: string,
    direccion_sucursal: string,
    enlace_sucursal: string,
    telefono_sucursal: string
}

interface Empresas {
    id_empresa: string | number,
    nombre_empresa: string,
    sucursales: Sucursales[],
}

interface Personal {
    id: string| number,
    nombre: string,
    departamento: string,
    isSelected: boolean,
}

interface State {
    empresas: Empresas[]
    personal: Personal[]
    isLoading: boolean,
    isCompleted: boolean
}

const initialState: State = {
    empresas: [],
    personal: [],
    isCompleted: false,
    isLoading: false,
}

export const getEmpresasSucursales = createAsyncThunk('fetch/getEmpresasSucursales', async (token: string, {rejectWithValue}) => {
    if (!token) {
        return
    }
    try {
        const response = await Api.withToken('get', token);
        if (response.statusCode === 200) {
            return response.data
        } else {
            toast.error('Hubo un problema al realizar la solicitud al servidor');
            return rejectWithValue({ message: response.data.error });
        }

    } catch (error) {
        console.error('Error occurred during fetch:', error);
        toast.error('Hubo un error al realizar la solicitud: ' + error);
        return rejectWithValue({ message: 'Request failed' });
    }
});

const EmpresasPersonalSucursales = createSlice({
    name: 'empresas',
    initialState,
    reducers: {
        Out: (state) => {
            state.empresas = [];
            state.isCompleted = false;
            state.isLoading = false;
            state.personal = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getEmpresasSucursales.pending, (state) => {
            state.isCompleted = false;
            state.isLoading = true;
        })
        .addCase(getEmpresasSucursales.fulfilled, (state, action) => {
            state.isCompleted = true;
            state.isLoading = false;
            state.empresas = action.payload.empresas_sucursales;
            state.personal = action.payload.personal;
        })
        .addCase(getEmpresasSucursales.rejected, (state) => {
            state.isCompleted = false;
            state.isLoading = false;
            state.empresas = [];
            state.personal = []
        })
    }
})

export const { Out } = EmpresasPersonalSucursales.actions;
export default EmpresasPersonalSucursales.reducer;