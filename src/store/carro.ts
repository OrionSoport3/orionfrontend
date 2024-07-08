import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Carro {
    id: number | null,
    modelo: string,
    url: string,
    descripcion: string,
    chequeado: boolean
}

interface State {
    check: Carro[],
}

const initialState: State = {
    check: [],
}

const carroChequeado = createSlice({
    name: 'carros',
    initialState,
    reducers: {
        chequear: (state, action: PayloadAction<Carro[]>) => {
            state.check = action.payload
        },
        unchequear: (state) => {
            state.check = []
        }
    }
})

export const { chequear, unchequear } = carroChequeado.actions;
export default carroChequeado.reducer;