// ciudadesFavoritasSlice.js

import { createSlice } from '@reduxjs/toolkit';

interface AppState {
    ciudadesFavoritas: string[];
  }

// Define el estado inicial
const initialState: AppState = {
    ciudadesFavoritas: [],
  };

const ciudadesFavoritasSlice = createSlice({
  name: 'ciudadesFavoritas',
  initialState,
  reducers: {
    agregarCiudadFavorita: (state, action) => {
      state.ciudadesFavoritas = [...state.ciudadesFavoritas, action.payload];
    },
    quitarCiudadFavorita: (state, action) => {
      state.ciudadesFavoritas = state.ciudadesFavoritas.filter(ciudad => ciudad !== action.payload);
    }
  }
});

export const { agregarCiudadFavorita, quitarCiudadFavorita } = ciudadesFavoritasSlice.actions;

export default ciudadesFavoritasSlice.reducer;
