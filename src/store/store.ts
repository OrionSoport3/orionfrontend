import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../store';
import isSelectedReducer from './form'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    select: isSelectedReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;