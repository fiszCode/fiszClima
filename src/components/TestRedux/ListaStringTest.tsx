// components/StringList.js
import React, { useState } from 'react';
import { useSelector, useDispatch, TypedUseSelectorHook} from 'react-redux';
import { listaStringTestAdd, listaStringTestRemove} from '@/store/slices/listaStringTestSlice';
import { RootState } from '@/store/store';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const ListaStringTest = () => {
  const items = useTypedSelector(state => state.listaStringTest.items);
  const dispatch = useDispatch();
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    dispatch(listaStringTestAdd(newItem));
    setNewItem('');
  };

  return (
    <div>
      <h1>Lista de Strings</h1>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={handleAddItem}>Agregar</button>
      <ul>
        {items.map((item:any, index:any) => (
          <li key={index}>
            {item} <button onClick={() => dispatch(listaStringTestRemove(item))}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaStringTest;
