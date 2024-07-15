// store/slices/listSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const listaStringTestSlice = createSlice({
  name: 'listaStringTest',
  initialState: {
    items: [],
  },
  reducers: {
    listaStringTestAdd: (state, action) => {
      state.items.push(action.payload);
    },
    listaStringTestRemove: (state, action) => {
      state.items = state.items.filter(item => item !== action.payload);
    },
  },
});

export const { listaStringTestAdd, listaStringTestRemove } = listaStringTestSlice.actions;

export default listaStringTestSlice.reducer;
