// ciudadActual.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ciudadActual: ""
};

const ciudadActualSlice = createSlice({
  name: 'ciudadActual',
  initialState,
  reducers: {
    asignarCiudadActual: (state, action) => {
      state.ciudadActual = action.payload;
    },
    quitarCiudadActual: (state) => {
      state.ciudadActual = "";
    }
  }
});

export const { asignarCiudadActual, quitarCiudadActual } = ciudadActualSlice.actions;

export default ciudadActualSlice.reducer;
