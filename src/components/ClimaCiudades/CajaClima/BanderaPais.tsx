// BanderaPais
////////////////////
// Componente utilizado para mostrar el país
////////////////////

// Importaciones
import React, { useState, useEffect } from 'react';
import {css} from "@emotion/react"; 

// El componente en si mismo
export interface PaisType {siglas: string}
export default function BanderaPais({siglas}: PaisType)
{
     const [countryName, setName] = useState("");
     let [countryFlag, setFlag] = useState("");
      
     useEffect(() => {
         const fetchData = async () => {
            console.log("Consultando datos de pais: " + siglas)
             const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${siglas}`);
             const jsonData = await response.json();
             if (siglas) {
                 setName(jsonData[0].name.common);
                 setFlag(jsonData[0].flags.svg);
             } else {
                 setName("Tierra");
                 setFlag("https://flagcdn.com/un.svg");
             };
        }
     fetchData()}, [siglas]);
    

     return (
         <div css={cajaPadre}>
             <div>
                 <img src={countryFlag} style={{ border: '2px solid #084b8f' }} width="100"></img>
             </div>
             <div>
                 {countryName.length > 5 && <div css={letraMediana}>{countryName}</div>}    
                 {countryName.length < 6 && <div css={letraGrande}>{countryName}</div>}  
             </div>
         </div>
     )
}

// CSS ---------------------
const cajaPadre = css`
     min-width: 175px;
     width: 175px;
     height: 120px;
     margin-top: 14px;
     display: flex;
     flex-direction: column;
     justify-content: flex-start; /* Centra verticalmente arriba */
     align-items: center; /* Centra horizontalmente */
     /*background-color: red;*/
     color: #084b8f;  /* Cambia el color del texto si es necesario */
     font-weight: bold; /* Cambiado a 'font-weight' en lugar de 'font-style' */
     text-align: center; /* Alinea el texto horizontalmente */   /* Centra el texto en cada línea */
`;

const letraGrande = css`
     font-size: 30px;
     color: #084b8f; /* Cambia el color del texto si es necesario */
`;

const letraMediana = css`
     font-size: 23px;
     color: #084b8f; /* Cambia el color del texto si es necesario */
`;