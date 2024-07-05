import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [countryName, setName] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://restcountries.com/v3.1/alpha?codes=IL');
      const jsonData = await response.json();
      setData(jsonData);
      setName(jsonData[0].name.common);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Nombre del país: {countryName}</h1>
      
      <h1>Datos de la API</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      
    </div>
  );
}

export default App;