// components/Counter.js
import React from 'react';
import { useSelector, useDispatch, TypedUseSelectorHook} from 'react-redux';
import { incrementContadorTest, decrementContadorTest, resetContadorTest} from '@/store/slices/contadorTestSlice';
import { RootState } from '@/store/store';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;


const ContadorTest = () => {
  const count = useTypedSelector(state => state.contadorTest.value);
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
