// fiszClima - 2024
////////////////////

// Importamos la dependencias básicas
import React, { useState, useEffect, useRef} from 'react';
import {css} from "@emotion/react"; 

// Dependencias usadas por Material UI
import { AppBar, Box, Toolbar, IconButton, Typography, InputBase, List, ListItem, ListItemText, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import IconPlaceholder from '@mui/icons-material/HelpOutline'; // Placeholder icon, replace with your desired icons
import { styled, alpha, useTheme} from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

// Importamos los componentes propios
import CajaClima from "@/components/CajaClima"; // C
import CajaPais from "@/components/CajaPais"; // C
import CajaCiudad from "@/components/CajaCiudad"; // C
import CajaTarjeta from "@/components/CajaTarjeta"; // C
import CajaFooter from "@/components/CajaFooter"; // C

import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/components/CajaMapa'), {
    ssr: false, // Esto asegura que el mapa solo se renderice en el cliente
  });

// Componente principal
function App() 
{
     const searchRef = useRef(null);
     // Creamos las variables donde vamos a guardar los datos recuperados de la API del clima
     const [estadoPagina, setEstadoPagina] = useState("A");
     const [cityLat, setCityLat] = useState(0);
     const [cityLon, setCityLon] = useState(0);
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
     const [ocultarLista, setOcultarLista] = useState(0);

     // Agrega useEffect para llamar a obtenerDatosClima cuando cambien cityLat y cityLon
     useEffect(() => { if (cityLat !== 0 && cityLon !== 0) {obtenerDatosClima(); setOcultarLista(1)}}, [cityLat, cityLon]);
    
     // Función utilizada para obtener la lista de ciudades
     const obtenerNombreCiudades = async () => {
         console.log("obtenerNombreCiudades")
         if (cityName !== '') {
             const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=10&appid=72a8af477f23cc2e1c7eb81e9a142367`;
             const response = await fetch(url);
             const jsonData = await response.json();
             setListaCiudades(jsonData);
             //setEstadoPagina("B");
         } else {console.log("Ciudad vacia")}
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
     
     // Lógica utilizada por el buscador de la AppBar

     const [cajaCiudad, setCajaCiudad] = useState('');
     const [results, setResults] = useState([]);

     // Agrega useEffect para llamar a obtenerNombreCiudades cuando cambia CityName
     useEffect(() => {
         obtenerNombreCiudades()
       }, [cityName]);

     // Agrega useEffect para llamar a obtenerNombreCiudades cuando cambia cajaCiudad
      useEffect(() => {
         setCityName(cajaCiudad)
             //obtenerNombreCiudades()
        }, [cajaCiudad]);


    // Manejar cambios en Caja Ciudad
     const handleSearchChange = (event) => {
         setCajaCiudad(event.target.value);
             //setCityName(cajaCiudad)
             //obtenerNombreCiudades()  
     };


     // Manejador de eventos para detectar clics fuera del componente
     useEffect(() => {
         const handleClickOutside = (event) => {
             if (searchRef.current && !searchRef.current.contains(event.target)) {
                 setOcultarLista(1);  // Oculta la lista al hacer clic fuera del componente
             }
         };
         document.addEventListener('mousedown', handleClickOutside);
         return () => {document.removeEventListener('mousedown', handleClickOutside); }}, [searchRef, ocultarLista])

         const [TabValue, setTabValue] = React.useState('2');
         const handleTabChange = (event: React.SyntheticEvent, newTabValue: string) => {
           setTabValue(newTabValue);}

        // Agrega un estado para la clave de actualización
const [mapKey, setMapKey] = useState(Date.now());

// Incrementa la clave cuando cambien cityLat y cityLon
useEffect(() => {
    setMapKey(Date.now());
}, [cityLat, cityLon]);

     // Return de la página 
     if (estadoPagina !== "error") 
     {
         // Formulario de coordenadas + información del clima (sólo si está disponible)
         return (
             <div>
                 <Box sx={{ flexGrow: 1 }}>
                     <AppBar position="fixed">
                         <Toolbar>
                             <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
                                 <MenuIcon />
                             </IconButton>
                             <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                                 fiszClima
                             </Typography>
                             <Box sx={{ flexGrow: 1 }} />
                             <Search ref={searchRef} onClick={() => {setOcultarLista(0)}}>
                                 <SearchIconWrapper>
                                 <SearchIcon />
                                 </SearchIconWrapper>
                                 <StyledInputBase placeholder="Buscar ciudad..." inputProps={{ 'aria-label': 'search' }} value={cajaCiudad} onChange={handleSearchChange}/>
                                 {cajaCiudad.length > 0 && listaCiudades.length > 0 && ocultarLista === 0 && (
                                     <Paper sx={{ position: 'absolute', zIndex: 1, top: '100%', left: 0, right: 0 }}>
                                         <List>
                                             {console.log ("Llamada appbar")}
                                             {console.log (listaCiudades)}
                                             {listaCiudades.map((item, index) => {
                                                 const name = item.name ? item.name : "";
                                                 const state = item.state ? `, ${item.state}` : "";
                                                 const country = item.country ? `, ${item.country}` : "";
                                                 return (
                                                     <ListItem  button key={index} onClick={() => {setCityLon(listaCiudades[index].lon); setCityLat(listaCiudades[index].lat)}}>
                                                         <ListItemText primary={`${name}${state}${country}`} />
                                                     </ListItem>
                                                 );
                                             })}
                                         </List>
                                     </Paper>     
                                 )}
                             </Search>
                             <Box sx={{ flexGrow: 1 }} />
                             <IconButton size="large" edge="end" color="inherit" aria-label="icon1">
                                 <IconPlaceholder />
                             </IconButton>
                             <IconButton size="large" edge="end" color="inherit" aria-label="icon2">
                                 <IconPlaceholder />
                             </IconButton>
                         </Toolbar>
                     </AppBar>
                 </Box>        
                 <div css={cajaPadre}>
                 {estadoPagina === "C" ? (
                 
                 <div css={cajaClima}>
                     <div css={filaClima}>
                         <CajaPais siglas={paisActual}/>
                         <CajaCiudad ciudad={ciudadActual}/>
                     </div>
                     <div css={filaClima}>
                         <MapComponent key={mapKey} lat={cityLat} lng={cityLon}/>
                     </div>
                     <div css={filaClima}>
                         <CajaClima temperatura={temperaturaActual} termica={temperaturaActual} escala = "C" clima = {climaActual} climaDESC={climaActualDescripcion} climaID={climaActualID} climaICO={climaActualICO}/>
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
                                     <CajaTarjeta tipo={1} titulo = "" descripcion= "Hora actual" extra ={zonaHoraActual}/>
                                     <CajaTarjeta tipo={2} titulo = {amanecerActual} descripcion= "Amanecer" extra ={zonaHoraActual}/>
                                     <CajaTarjeta tipo={3} titulo = {atardecerActual} descripcion= "Anochecer" extra ={zonaHoraActual}/>
                                 </div>
                             </TabPanel>
                             <TabPanel value="3">
                                 <div css={filaClima}>
                                     <CajaTarjeta tipo={4} titulo = {visibilidadActual} descripcion= "Visibilidad" extra = ""/>
                                     <CajaTarjeta tipo={5} titulo = {humedadActual + "%"} descripcion= "Humedad" extra = ""/>
                                     <CajaTarjeta tipo={6} titulo = {vientoActual} descripcion= "Viento" extra = ""/>
                                 </div>
                             </TabPanel>
                         </TabContext>
                     </Box>
                     <CajaFooter/>
                     </div>
                     
                     ):(<div></div>)
                    }    
             </div>
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

//const theme = useTheme();
//const appBarHeight = theme.mixins.toolbar.minHeight; // Esto obtiene la altura mínima de AppBar

const cajaPadre = css`
     width: 800px;
     margin: 0 auto;
     padding: 20px;
     background-color: #96a3c9; /*#d1c2a5;*/
     padding-top:  75px; 
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

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    width: '450px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '450px',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));