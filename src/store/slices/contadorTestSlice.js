// store/slices/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const contadorTestSlice = createSlice({
  name: 'contadorTest',
  initialState: {
    value: 0,
  },
  reducers: {
    incrementContadorTest: state => {
      state.value += 1;
    },
    decrementContadorTest: state => {
      state.value -= 1;
    },
    resetContadorTest: state => {
      state.value = 0;
    },
  },
});

export const { incrementContadorTest, decrementContadorTest, resetContadorTest} = contadorTestSlice.actions;

export default contadorTestSlice.reducer;
