// BuscadorCiudades
////////////////////
// 
////////////////////

// Dependencias usadas por Material UI
import { InputBase, List, ListItem, ListItemText, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; 
import { styled, alpha} from '@mui/material/styles';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {asignarCiudadActual, quitarCiudadActual} from '@/store/slices/ciudadActualSlice';
import { incrementContadorConsultas, decrementContadorConsultas, resetContadorConsulta} from '@/store/slices/contadorConsultasSlice';

// El componente en sí
export default function BuscadorCiudades({ pasarCiudadToNavBar }: { pasarCiudadToNavBar: (coordenadas: { lon: number, lat: number }) => void })
{
     // Para manejarel contador de Redux
     const count = useSelector(state => state.contadorConsultas.value);
     const dispatch = useDispatch();
    
     // Utilizado para controlar la ocultación de la lista al hacer clic fuera
     const searchRef = useRef<any>(null);

     // Utilizados para la funcion que obtiene el nombre de las ciudades
     const [cityName, setCityName] = useState(''); 
     const [listaCiudades, setListaCiudades] = useState<any>([]);
     const [ocultarLista, setOcultarLista] = useState(0);

     // Función utilizada para obtener la lista de ciudades
     const obtenerNombreCiudades = async () => {
         if (cityName !== '') {
             const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=10&appid=72a8af477f23cc2e1c7eb81e9a142367`;
             const response = await fetch(url);
             const jsonData = await response.json();
             setListaCiudades(jsonData);
         } else {console.log("Ciudad vacia")}
     }

     // Utilizada por el buscador de la NavBar
     const [cajaCiudad, setCajaCiudad] = useState('');

     // Manejar cambios en la caja del buscador
     const handleSearchChange = (event:any) => {setCajaCiudad(event.target.value)};

     // Agrega useEffect cambiar CityName cuando cambia cajaCiudad
     useEffect(() => {setCityName(cajaCiudad)}, [cajaCiudad]);

     // Agrega useEffect para llamar a obtenerNombreCiudades cuando cambia CityName
     useEffect(() => {obtenerNombreCiudades()}, [cityName]);

     // Manejador de eventos para detectar clics fuera del componente
     useEffect(() => {
         const handleClickOutside = (event:any) => {
             if (searchRef.current && !searchRef.current.contains(event.target)) {
                 setOcultarLista(1);  // Oculta la lista al hacer clic fuera del componente
             }
         };
         document.addEventListener('mousedown', handleClickOutside);
         return () => {document.removeEventListener('mousedown', handleClickOutside); }
     }, [searchRef, ocultarLista])

     return (
         <Search ref={searchRef} onClick={() => {setOcultarLista(0)}}>
             <SearchIconWrapper>
                 <SearchIcon />
             </SearchIconWrapper>
             <StyledInputBase placeholder="Buscar ciudad..." inputProps={{ 'aria-label': 'search' }} value={cajaCiudad} onChange={handleSearchChange}/>
             {cajaCiudad.length > 0 && listaCiudades.length > 0 && ocultarLista === 0 && (
                 <Paper sx={{ position: 'absolute', zIndex: 1, top: '100%', left: 0, right: 0 }}>
                     <List>
                         {listaCiudades.map((item:any, index:any) => {
                             const name = item.name ? item.name : "";
                             const state = item.state ? `, ${item.state}` : "";
                             const country = item.country ? `, ${item.country}` : "";
                                 return (
                                     <ListItem  button key={index} onClick={() => {
                                        pasarCiudadToNavBar({ lon: listaCiudades[index].lon, lat: listaCiudades[index].lat });
                                        dispatch(incrementContadorConsultas())
                                        dispatch(asignarCiudadActual(name))
                                      }}>
                                         <ListItemText primary={`${name}${state}${country}`} />
                                     </ListItem>
                                 );
                             })}
                     </List>
                 </Paper>     
             )}
         </Search>                   
     )
}

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