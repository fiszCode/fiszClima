// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import contadorTestReducer from './slices/contadorTestSlice';
import listaStringTestReducer from './slices/listaStringTestSlice';
import contadorConsultasReducer from './slices/contadorConsultasSlice';
import ciudadesFavoritasReducer from './slices/ciudadesFavoritasSlice';
import ciudadActualReducer from './slices/ciudadActualSlice';

const store = configureStore({
  reducer: {
    contadorTest: contadorTestReducer,
    listaStringTest: listaStringTestReducer,
    contadorConsultas: contadorConsultasReducer,
    ciudadesFavoritas: ciudadesFavoritasReducer,
    ciudadActual: ciudadActualReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;