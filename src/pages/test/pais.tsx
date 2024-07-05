import React, { useState, useEffect } from 'react';
import {css} from "@emotion/react"; 

function App() {
  const [countryCode, setCountryCode] = useState('');
  const [countryName, setName] = useState([]);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const url = `https://restcountries.com/v3.1/alpha?codes=${countryCode}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    setData(jsonData);
    setName(jsonData[0].name.common);
  };

  return (
    <div css={cajaPadre}>
      <h1>Ingrese el código del país (ISO 3166-1 alpha-2):</h1>
      <input
        type="text"
        value={countryCode}
        onChange={(e) => setCountryCode(e.target.value)}
      />
      <button onClick={fetchData}>Buscar País</button>
      <h1>Nombre del país: {countryName}</h1>
      <h1>Datos de la API</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;

// CSS ---------------------

const cajaPadre = css`
    width: 300px;
    height: 300px;
    display: flex;
    justify-content: center;  /* Centra horizontalmente */
    align-items: center;      /* Centra verticalmente */
    background-color: red;
    color: white;             /* Cambia el color del texto si es necesario */
    font-size: 20px;
    text-align: center;       /* Centra el texto en cada línea */
`;