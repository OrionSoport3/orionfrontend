import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Sucursales {
    id_sucursal: number,
    nombre_sucursal: string,
    direccion_sucursal: string,
    enlace_sucursal: string,
    telefono_sucursal: string,
    isSelected_sucursal: boolean,
}

interface Empresas {
    id_empresa: number,
    nombre_empresa: string,
    isSelected_empresa: boolean,
    sucursales: Sucursales[],
}

interface State {
    empresas: Empresas[],
}

const initialState: State = {
    empresas: [],
}

const selectionEmpresa = createSlice({
    name: 'empresas',
    initialState,
    reducers: {
        selected: (state, action: PayloadAction<Empresas[]>) => {
            state.empresas = action.payload;
        },
        unselect: (state) => {
            state.empresas = [];
        }
    }
})

export const { selected, unselect } = selectionEmpresa.actions;
export default selectionEmpresa.reducer;