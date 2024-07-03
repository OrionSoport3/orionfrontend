import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Sucursales {
    id_sucursal: number | string | null,
    nombre_sucursal: string,
    direccion_sucursal: string,
    enlace_sucursal: string,
    telefono_sucursal: string,
}

interface Empresas {
    id_empresa: number | string | null,
    nombre_empresa: string,
    sucursales: Sucursales[],
}

interface State {
    empresas: Empresas,
}

const initialState: State = {
    empresas: {
        id_empresa: null,
        nombre_empresa: '',
        sucursales: [],
    }

}

const selectionEmpresa = createSlice({
    name: 'empresas',
    initialState,
    reducers: {
        selected: (state, action: PayloadAction<Empresas>) => {
            state.empresas = action.payload

        },
        unselect: (state) => {
            state.empresas = {
                id_empresa: null,
                nombre_empresa: '',
                sucursales: []
            }
        }
    }
})

export const { selected, unselect } = selectionEmpresa.actions;
export default selectionEmpresa.reducer;