import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../services/Api";
import { toast } from "sonner";


interface Actividad {
    id_servicio: number | string,
    estado: string,
    fecha_final: string | Date,
    fecha_inicial: string | Date,
    inconvenientes: string,
    empresa: string,
    sucursal: string,
    titulo: string,
    vehiculo: string,
    vendedor: string,
    resumen: string,
}

interface State {
    actividades: Actividad | null,
    isLoading: boolean,
    isCompleted: boolean,
}

const initialState: State = {
    
    actividades: null,
    isLoading: false,
    isCompleted: false,
}

export const getDocuments = createAsyncThunk(
    'fetch/getDocuments',
    async (data: { token: string; datos: any }, { rejectWithValue }) => {
      if (!data.token) {
        return rejectWithValue({ message: 'Token is missing' });
      }
      try {
        const response = await Api.postActivitie('get_service', data.datos, data.token);
        if (response.statusCode === 200) {
          return response.data.respuesta;
        } else {
          toast.error('Hubo un problema al realizar la solicitud al servidor');
          return rejectWithValue({ message: response.data.error });
        }
      } catch (error) {
        console.error('Error occurred during fetch:', error);
        toast.error('Hubo un error al realizar la solicitud: ' + error);
        return rejectWithValue({ message: 'Request failed' });
      }
    }
  );
  

const activitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {
        Out: (state) => {
            state.actividades = null;
            state.isCompleted = false;
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(getDocuments.pending, (state) => {
            state.isLoading = true;
            state.isCompleted = false;
          })
          .addCase(getDocuments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isCompleted = true;
            state.actividades = action.payload;
          })
          .addCase(getDocuments.rejected, (state) => {
            state.isLoading = false;
            state.isCompleted = false;
            state.actividades = null;
            toast.error( 'Error al obtener datos');
          });
      }
      
});

export const { Out } = activitySlice.actions;
export default activitySlice.reducer;
