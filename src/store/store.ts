import { configureStore, combineReducers, Action } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../store";
import selectedReducer from "./select"
import { thunk, ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";
import empresasReducer from './empresas';
import carroReducer from './carro'
import ActivityReducerOnly from './documents'
import AllActivitidades from './actividades';
import EmpresasPersonasSucursales from './empresas_sucursales';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['select', 'auth', 'empresas', 'carro', 'actividades']
};

const rootReducer = combineReducers({
  auth: authReducer,
  select: selectedReducer,
  empresas: empresasReducer,
  carro: carroReducer,
  infoDocs: ActivityReducerOnly,
  actividades: AllActivitidades,
  empresasGente: EmpresasPersonasSucursales,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk), 
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunkDispatch = ThunkDispatch<RootState, void, Action>
export const  useAppDispatch = () => useDispatch<AppThunkDispatch>();

export default store;
