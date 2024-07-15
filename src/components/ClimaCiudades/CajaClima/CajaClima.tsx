// CajaClima
////////////////////
// Este componente recibe coordenadas y muestra la información de clima correspondiente a esas coordenadas vía API
// Utiliza, a la vez, otros componentes para armar todo el panel de visualización de la información
////////////////////

// Importamos la dependencias básicas
import React, { useState, useEffect} from 'react';
import {css} from "@emotion/react"; 

// Importaciones de Redux
import { useSelector} from 'react-redux';
import ContadorTest from '@/components/TestRedux/ContadorTest';

// Dependencias usadas por Material UI
import {Box} from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import dynamic from 'next/dynamic';

// Importamos los componentes propios
import TemperaturaActual from "@/components/ClimaCiudades/CajaClima/TemperaturaActual"; // C
import BanderaPais from "@/components/ClimaCiudades/CajaClima/BanderaPais"; // C
import NombreCiudad from "@/components/ClimaCiudades/CajaClima/NombreCiudad"; // C
import Tarjeta from "@/components/ClimaCiudades/CajaClima/Tarjeta"; // C

// El componente en si
interface ClimaType {ciudadLat: number; ciudadLon: number;}
export default function CajaClima({ciudadLat, ciudadLon}: ClimaType)
{
     // Creamos las variables donde vamos a guardar los datos recuperados de la API del clima
     const [estadoPagina, setEstadoPagina] = useState("A");
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

     // Agrega useEffect para llamar a obtenerDatosClima cuando cambien ciudadLat y ciudadLon
     useEffect(() => { 
        ciudadLat !== 0 && ciudadLon !== 0 && obtenerDatosClima()
    }, [ciudadLat, ciudadLon]);

     // Función async encargada de obtener los datos de la API
     const obtenerDatosClima = async () => 
     {
         // Accedemos a la API
         const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ciudadLat}&lon=${ciudadLon}&appid=72a8af477f23cc2e1c7eb81e9a142367&lang=es`;
         const response = await fetch(url);
         const jsonData = await response.json();
         
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

     // Con esto gestionamos las tabs
     const [TabValue, setTabValue] = React.useState('2');
     const handleTabChange = (event: React.SyntheticEvent, newTabValue: string) => {
     setTabValue(newTabValue);} 

     // Importamos el componente Mapa
     const Mapa = dynamic(() => import('@/components/ClimaCiudades/CajaClima/Mapa'), {
         ssr: false, // Toda esta cosa dynamic medio overkill es para forzar que se actualice al cambiar de ciudad
     });

     // Agrega un estado para la clave de actualización del mapa
     const [mapKey, setMapKey] = useState(Date.now());
     
     // Incrementa la clave cuando cambien ciudadLat y ciudadLon
     useEffect(() => {setMapKey(Date.now())}, [ciudadLat, ciudadLon]);

     // Return de la página 
     if (estadoPagina !== "error") 
     {
         return (
             <div>
                 <div css={textoContador}>
                     Consultas realizadas: {useSelector(state => state.contadorConsultas.value)}
                 </div>
                 {estadoPagina === "C" ? (
                     <div css={cajaClima}>
                         <div css={filaClima}>
                             <BanderaPais siglas={paisActual}/>
                             <NombreCiudad ciudad={ciudadActual}/>
                         </div>
                         <div css={filaClima}>
                             <Mapa key={mapKey} lat={ciudadLat} lng={ciudadLon}/>
                         </div>
                         <div css={filaClima}>
                             <TemperaturaActual temperatura={temperaturaActual} termica={termicaActual} escala = "C" clima = {climaActual} climaDESC={climaActualDescripcion} climaID={climaActualID} climaICO={climaActualICO} Tmaxima={maximaActual} Tminima={minimaActual}/>
                         </div>
                         <Box sx={{ width: '100%', typography: 'body1' }}>
                             <TabContext value={TabValue}>
                                 <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                     <TabList centered onChange={handleTabChange} aria-label="lab API tabs example">
                                         <Tab label={<span style={{ fontWeight: 'bold'}}>Semanal</span>} value="1" disabled />
                                         <Tab label={<span style={{ fontWeight: 'bold', color: '#084b8f' }}>Amanecer/Atardecer</span>} value="2" />
                                         <Tab label={<span style={{ fontWeight: 'bold', color: '#084b8f' }}>+ Info</span>} value="3" />
                                     </TabList>
                                 </Box>
                                 <TabPanel value="1">Hola, soy un placeholder</TabPanel>
                                 <TabPanel value="2">
                                     <div css={filaClima}>
                                         <Tarjeta tipo={1} titulo = "" descripcion= "Hora actual" extra ={zonaHoraActual}/>
                                         <Tarjeta tipo={2} titulo = {amanecerActual} descripcion= "Amanecer" extra ={zonaHoraActual}/>
                                         <Tarjeta tipo={3} titulo = {atardecerActual} descripcion= "Anochecer" extra ={zonaHoraActual}/>
                                     </div>
                                 </TabPanel>
                                 <TabPanel value="3">
                                     <div css={filaClima}>
                                         <Tarjeta tipo={4} titulo = {visibilidadActual} descripcion= "Visibilidad" extra = ""/>
                                         <Tarjeta tipo={5} titulo = {humedadActual + "%"} descripcion= "Humedad" extra = ""/>
                                         <Tarjeta tipo={6} titulo = {vientoActual} descripcion= "Viento" extra = ""/>
                                     </div>
                                 </TabPanel>
                             </TabContext>
                         </Box>
                     </div>
                     ):(<div></div>)
                 }
             </div> 
         )
     }
     if (estadoPagina === "error") 
     {
         return (<div>No se que paso papu 🤌</div>);
     }
}
// CSS ---------------------
// Toda esto podria estar en style.ts y ser reutilizable haciendo un export/import en cualquier otro archivito de mierda

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
const textoContador = css`  
     color: #084b8f;
     font-weight: bold; 
     text-align: left;
`;
