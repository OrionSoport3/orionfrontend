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
    sucursales: Sucursales,
}

interface State {
    empresas: Empresas,
}

const initialState: State = {
    empresas: {
        id_empresa: null,
        nombre_empresa: '',
        sucursales: {
            direccion_sucursal: '',
            enlace_sucursal: '',
            id_sucursal: null,
            nombre_sucursal: '',
            telefono_sucursal: '',
        }
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
                sucursales: {
                    id_sucursal: null,
                    nombre_sucursal: '',
                    direccion_sucursal: '',
                    enlace_sucursal: '',
                    telefono_sucursal: '',
                },
            }
        }
    }
})

export const { selected, unselect } = selectionEmpresa.actions;
export default selectionEmpresa.reducer;