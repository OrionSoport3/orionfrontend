import { configureStore, combineReducers, Action } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../store";
import selectedReducer from "./select"
import { thunk, ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['select', 'auth']
};

const rootReducer = combineReducers({
  auth: authReducer,
  select: selectedReducer,
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
