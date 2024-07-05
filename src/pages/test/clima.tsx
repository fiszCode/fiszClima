// Importamos la dependencias
import React, { useState, useEffect } from 'react';
import CajaClima from "@/components/CajaClima"; // C
import CajaSoluna from "@/components/CajaSoluna"; // C
import CajaPais from "@/components/CajaPais"; // C
import CajaCiudad from "@/components/CajaCiudad"; // C

// Componente principal
function App() 
{
     // Creamos las variables donde vamos a guardar los datos recuperados de la API
     const [loading, setLoading] = useState("loading");
     const [cityLat, setCityLat] = useState('');
     const [cityLon, setCityLon] = useState('');
     const [temperaturaActual, setTemperaturaActual] = useState('');
     const [termicaActual, setTermicaActual] = useState('');
     const [minimaActual, setMinimaActual] = useState('');
     const [maximaActual, setMaximaActual] = useState('');
     const [presionActual, setPresionActual] = useState('');
     const [humedadActual, setHumedadActual] = useState('');
     const [visibilidadActual, setVisibilidadActual] = useState('');
     const [vientoActual, setVientoActual] = useState('');
     const [paisActual, setPaisActual] = useState('');
     const [amanecerActual, setAmanecerActual] = useState(0);
     const [atardecerActual, setAtardecerActual] = useState(0);
     const [zonaHoraActual, setZonaHoraActual] = useState('');
     const [ciudadActual, setCiudadActual] = useState('');
     const [climaActual, setClimaActual] = useState('');
     const [climaActualID, setClimaActualID] = useState('');
     const [climaActualDescripcion, setClimaActualDescripcion] = useState('');
     const [data, setData] = useState([]);

     // Función async encargada de obtener los datos de la API
     const fetchData = async () => 
     {
         const url = `https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&appid=72a8af477f23cc2e1c7eb81e9a142367`;
         const response = await fetch(url);
         const jsonData = await response.json();
         setData(jsonData);
         // Asignamos los valores individuales
         setTemperaturaActual(jsonData?.main?.temp);
         setTermicaActual(jsonData?.main?.feels_like);
         setMinimaActual(jsonData?.main?.temp_min);
         setMaximaActual(jsonData?.main?.temp_max);
         setPresionActual(jsonData?.main?.pressure);
         setHumedadActual(jsonData?.main?.humidity);
         setVisibilidadActual(jsonData?.visibility);
         setVientoActual(jsonData?.wind?.speed);
         setPaisActual(jsonData?.sys?.country);
         setAmanecerActual(jsonData?.sys?.sunrise);
         setAtardecerActual(jsonData?.sys?.sunset);
         setZonaHoraActual(jsonData?.timezone);
         setCiudadActual(jsonData?.name);
         setClimaActual(jsonData?.weather[0]?.main);
         setClimaActualID(jsonData?.weather[0]?.id);
         setClimaActualDescripcion(jsonData?.weather[0]?.description);
         setLoading("ready");
     }
     if (loading !== "error") 
     {
         // Formulario de coordenadas + información del clima (sólo si está disponible)
         return (
             <div className="contenedor">
                 <h1>Latitud de la ciudad:</h1>
                 <input type="text" value={cityLat} onChange={(e) => setCityLat(e.target.value)}/>
                 <h1>Longitud de la ciudad:</h1>
                 <input type="text" value={cityLon} onChange={(e) => setCityLon(e.target.value)}/>
                 <button onClick={fetchData}>Buscar Ciudad</button>
                 <h1>Valor loading: {loading}</h1>   
                 {loading === "ready" ? (<div>
                     <div className="clima-actual">
                         <CajaClima temperatura={temperaturaActual} termica={temperaturaActual} escala = "C" clima = {climaActual} climaDESC={climaActualDescripcion} climaID={climaActualID}/>
                     </div>
                     <div className="detalles">
                         <CajaSoluna dato={amanecerActual} tipo = {1}/>
                         <CajaSoluna dato={atardecerActual} tipo = {0}/>
                         <CajaCiudad ciudad={ciudadActual}/>
                         <CajaPais siglas={paisActual}/>
                     </div>
                     <h1>Datos de la API</h1>
                     <pre>{JSON.stringify(data, null, 2)}</pre>
                     </div>):(<div></div>)}    
             </div>
         );
     }
     if (loading === "error") 
     {
         return (<div>No se que paso papu 🤌</div>);
     }
}

export default App;