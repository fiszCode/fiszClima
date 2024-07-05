import React, { useState, useEffect } from 'react';

function App() {

     const [latCiudad, setLat] = useState([]);
     const [lonCiudad, setLon] = useState([]);
     
     // Utilizados para la funcion que obtiene el nombre de las ciudades
     const [cityName, setCityName] = useState(''); 
     const [listaCiudades, setListaCiudades] = useState([]);

     // Función utilizada para obtenre la lista de ciudades
     const obtenerNombreCiudades = async () => {
         const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=10&appid=72a8af477f23cc2e1c7eb81e9a142367`;
         const response = await fetch(url);
         const jsonData = await response.json();
         setListaCiudades(jsonData);
         setLat(jsonData[0].lat);
         setLon(jsonData[0].lon);
     };

     return (
         <div>
             <h1>Ingrese el nombre de la ciudad:</h1>
             <input type="text" value={cityName} onChange={(e) => setCityName(e.target.value)}/>
             <button onClick={obtenerNombreCiudades}>Buscar Ciudad</button>
             <h1>Lat: {latCiudad}</h1>
             <h1>Lon: {lonCiudad}</h1>

             {listaCiudades.map((item, index) => (
                 <div>
                     <button key={index}>{item.name}, {item.state}, {item.country}</button>
                     <br></br><br></br>
                 </div>
             ))}

             
             <h1>Datos de la API</h1>
             <pre>{JSON.stringify(listaCiudades, null, 2)}</pre>
         </div>
     );
}

export default App;