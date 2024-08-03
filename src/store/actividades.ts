import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../services/Api";
import { toast } from "sonner";

interface Personal {
    nombre: string
}

interface Actividad {
    id_actividad: string | number,
    sucursal: string,
    empresa: string,
    titulo: string,
    resumen: string,
    fecha_inicio: string | Date,
    fecha_final: string | Date,
    vendedor: string,
    inconvenientes: string,
    estado: string,
    vehiculo: string,
    mes_año: boolean,
    fecha: boolean,
    personal: null | Personal,
}

interface ActividadEnPlural {
    actividades: Actividad[] | null,
    isLoading: boolean,
    isCompleted: boolean,
}

interface FetchDataParams {
    token?: string;
    data?: any; 
  }

const initialState: ActividadEnPlural  = {
    actividades: [],
    isLoading: false,
    isCompleted: false,
}

export const getAllActivities = createAsyncThunk('fetch/getAllActivities', async ({token, data}: FetchDataParams, {rejectWithValue}) => {
    if (!token) {
        return rejectWithValue({ message: 'Token is missing' })
    }
    try {
        const response = await Api.postActivitie('get_activities',data ,token);
        if (response.statusCode === 200) {
            return response.data.actividad
        } if (response.statusCode === 404) {
            toast.info(response.data.message);
            return rejectWithValue({message: response.data.message})
        } else {
            toast.error('Hubo un problema al realizar la solicitud al servidor');
          return rejectWithValue({ message: response.data.message });
        }

        
    } catch (error) {
        console.error('Error occurred during fetch:', error);
        toast.error('Hubo un error al realizar la solicitud: ' + error);
        return rejectWithValue({ message: 'Request failed' });
    }
})

const AllActividadesSlice = createSlice({
    name: 'empresas',
    initialState,
    reducers: {
        exit: (state) => {
            state.actividades = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllActivities.pending, (state) => {
            state.isCompleted = false;
            state.isLoading = true;
        })
        .addCase(getAllActivities.fulfilled, (state, action) => {
            state.isCompleted = true;
            state.isLoading = false;
            state.actividades = action.payload;
        })
        .addCase(getAllActivities.rejected, (state) => {
            state.isLoading = false;
            state.isCompleted = false;
            state.actividades = null;
        });
    }
})

export const { exit } = AllActividadesSlice.actions;
export default AllActividadesSlice.reducer;