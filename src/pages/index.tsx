// fiszClima - 2024
////////////////////

// Importamos la dependencias básicas
import React, { useState} from 'react';
import {css} from "@emotion/react"; 

// Dependencias usadas por Material UI
import NavBar from '@/components/NavBar/NavBar';

// Importamos los componentes propios
import CajaClima from "@/components/CajaClima/CajaClima"; 
import Footer from "@/components/Footer"; 

// Componente principal
function App() 
{
     const [cityLat, setCityLat] = useState(0);
     const [cityLon, setCityLon] = useState(0);
     return (
         <div>
             <NavBar onCityClick={({ lon, lat }) =>{setCityLon(lon);setCityLat(lat)}}/>
             <div css={cajaPadre}>
                 <CajaClima ciudadLat={cityLat} ciudadLon={cityLon}/>
                 <Footer/>
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
