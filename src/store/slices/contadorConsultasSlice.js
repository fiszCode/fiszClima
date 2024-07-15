// store/slices/contadorConsultasSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const contadorConsultasSlice = createSlice({
  name: 'contadorConsultas',
  initialState: {
    value: 0,
  },
  reducers: {
    incrementContadorConsultas: state => {
      state.value += 1;
    },
    decrementContadorConsultas: state => {
      state.value -= 1;
    },
    resetContadorConsultas: state => {
      state.value = 0;
    },
  },
});

export const {incrementContadorConsultas, decrementContadorConsultas, resetContadorConsulta } = contadorConsultasSlice.actions;

export default contadorConsultasSlice.reducer;
