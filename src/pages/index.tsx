// fiszClima - 2024
////////////////////

// Importamos la dependencias básicas
import React, { useState} from 'react';
import {css} from "@emotion/react"; 
import { useSelector} from 'react-redux';

// Dependencias usadas por Material UI
import NavBar from '@/components/ClimaCiudades/NavBar/NavBar';

// Importamos los componentes propios
import CajaClima from "@/components/ClimaCiudades/CajaClima/CajaClima"; 
import Footer from "@/components/ClimaCiudades/Footer"; 
import BanderasTotales from "@/components/BanderasPaises/BanderasTotales"; 

import ContadorTest from '@/components/TestRedux/ContadorTest';
import ListaStringTest from '@/components/TestRedux/ListaStringTest';

// Componente principal
function App() 
{   
     const [paginaActual, setPaginaActual] = useState(1);
     const [cityLat, setCityLat] = useState(0);
     const [cityLon, setCityLon] = useState(0);
     return (
         <div>
             <NavBar pasarNavBarToApp={({lonNavBar, latNavBar}) =>{setCityLon(lonNavBar); setCityLat(latNavBar);}} pasarPagActualToApp={(pagActualMenu) =>{setPaginaActual(pagActualMenu)}} />
             <div css={cajaPadre}>
                 {paginaActual === 1 && <CajaClima ciudadLat={cityLat} ciudadLon={cityLon}/>}
                 {paginaActual === 2 && <BanderasTotales/>}
                 {paginaActual === 3 && <><ContadorTest/><ListaStringTest/></>}
                 <Footer/>
                 {/*<CajaClima ciudadLat= {43.270804} ciudadLon={49.433017}/>*/}
             </div>
         </div>
     );
}
export default App;

// CSS ---------------------
const cajaPadre = css`
     width: 800px;
     margin: 0 auto;
     padding: 20px;
     background-color: #96a3c9; /*#d1c2a5;*/
     padding-top:  75px; 
     border-radius: 10px;
     text-align: center;
`;
const textoContador = css`  
     color: #084b8f;
     font-weight: bold; 
     text-align: left;
`;
