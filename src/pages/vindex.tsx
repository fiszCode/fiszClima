// Importamos la dependencias
import React, { useState, useEffect } from 'react';
import {css} from "@emotion/react"; 
import CajaClima from "@/components/CajaClima"; // C
import CajaSoluna from "@/components/CajaSoluna"; // C
import CajaPais from "@/components/CajaPais"; // C
import CajaCiudad from "@/components/CajaCiudad"; // C
import CajaReloj from "@/components/CajaReloj"; // C
import CajaExtra from "@/components/CajaExtra"; // C

// Componente principal
function App() 
{
     // Creamos las variables donde vamos a guardar los datos recuperados de la API del clima
     const [estadoPagina, setEstadoPagina] = useState("A");
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
     const [zonaHoraActual, setZonaHoraActual] = useState(0);
     const [ciudadActual, setCiudadActual] = useState('');
     const [climaActual, setClimaActual] = useState('');
     const [climaActualID, setClimaActualID] = useState('');
     const [climaActualICO, setClimaActualICO] = useState('');
     const [climaActualDescripcion, setClimaActualDescripcion] = useState('');
     const [infoClima, setInfoClima] = useState([]);
     // Utilizados para la funcion que obtiene el nombre de las ciudades
     const [cityName, setCityName] = useState(''); 
     const [listaCiudades, setListaCiudades] = useState([]);

     // Agrega useEffect para llamar a obtenerDatosClima cuando cambien cityLat y cityLon
     useEffect(() => {
    if (cityLat !== '' && cityLon !== '') {
        obtenerDatosClima();
    }
}, [cityLat, cityLon]);
     
     // Función utilizada para obtenre la lista de ciudades
     const obtenerNombreCiudades = async () => {
         console.log("obtenerNombreCiudades")
         const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=10&appid=72a8af477f23cc2e1c7eb81e9a142367`;
         const response = await fetch(url);
         const jsonData = await response.json();
         setListaCiudades(jsonData);
         setEstadoPagina("B");
     };

     // Función async encargada de obtener los datos de la API
     const obtenerDatosClima = async () => 
     {
         console.log("obtenerDatosClima")
         console.log("Valor actual LAT:")
         console.log(cityLat)
         console.log("Valor actual LON:")
         console.log(cityLon)
         const url = `https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&appid=72a8af477f23cc2e1c7eb81e9a142367`;
         const response = await fetch(url);
         const jsonData = await response.json();
         setInfoClima(jsonData);
         console.log("Info obtenida en jsonData")
         console.log(jsonData)
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
         setClimaActualICO(jsonData?.weather[0]?.icon);
         setClimaActualDescripcion(jsonData?.weather[0]?.description);
         setEstadoPagina("C");
     }
     if (estadoPagina !== "error") 
     {
         // Formulario de coordenadas + información del clima (sólo si está disponible)
         return (
             <div css={cajaPadre}>
                 <input type="text" value={cityName} onChange={(e) => setCityName(e.target.value)}/>
                 <button onClick={obtenerNombreCiudades}>Buscar Ciudad</button>
                 {estadoPagina === "B" ? (<div>
                     {listaCiudades.map((item, index) => (
                         <div key={index}>
                         <br /><br />
                         <button
                         onClick={() => {
                             setCityLon(listaCiudades[index].lon);
                             setCityLat(listaCiudades[index].lat);
                         }}
                         >
                         {item.name}, {item.state}, {item.country}
                         </button>
                         </div>))
                     }
                 </div>):(<div></div>)}
                 {estadoPagina == "C" ? (<div css={cajaClima}>
                     <div css={filaClima}>
                         <CajaPais siglas={paisActual}/>
                         <CajaCiudad ciudad={ciudadActual}/>
                     </div>
                     <div css={filaClima}>
                         <CajaClima temperatura={temperaturaActual} termica={temperaturaActual} escala = "C" clima = {climaActual} climaDESC={climaActualDescripcion} climaID={climaActualID} climaICO={climaActualICO}/>
                     </div>
                     <div css={filaClima}>
                         <CajaReloj zonaH={zonaHoraActual}/>
                         <CajaSoluna dato={amanecerActual} tipo = {1}/>
                         <CajaSoluna dato={atardecerActual} tipo = {0}/>
                     </div>
                     <div css={filaClima}>
                         <CajaExtra dato="Visibilidad" valor={visibilidadActual + " mts"}/>
                         <CajaExtra dato="Humedad" valor={humedadActual + "%"}/>
                         <CajaExtra dato="Viento" valor={vientoActual}/>
                     </div>
                     </div>):(<div></div>)}    
             </div>
         );
     }
     if (estadoPagina === "error") 
     {
         return (<div>No se que paso papu 🤌</div>);
     }
}

export default App;

// CSS ---------------------
// Toda esta mierda podria estar en style.ts y ser reutilizable haciendo un export/import en cualquier otro archivito de mierda

const cajaPadre = css`
     width: 800px;
     margin: 0 auto;
     padding: 20px;
     background-color: #d1c2a5;
     border-radius: 10px;
     text-align: center;
`;

const cajaClima = 
css`
     display: flex;
     flex-direction: column;
     width: 800px;
     max-width: 800px;
`;
const filaClima = 
css`
     display: flex;
     flex-direction: row;
`;