// components/Counter.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementContadorTest, decrementContadorTest, resetContadorTest} from '@/store/slices/contadorTestSlice';

const ContadorTest = () => {
  const count = useSelector(state => state.contadorTest.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Contador: {count}</h1>
      <button onClick={() => dispatch(incrementContadorTest())}>Incrementar</button>
      <button onClick={() => dispatch(decrementContadorTest())}>Decrementar</button>
      <button onClick={() => dispatch(resetContadorTest())}>Reiniciar</button>
    </div>
  );
};

export default ContadorTest;
