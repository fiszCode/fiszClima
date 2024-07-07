// Componente utilizado para mostrar el país
import React, { useState, useEffect } from 'react';
import {css} from "@emotion/react"; 

export interface PaisType 
{
     siglas: string;
}

// El componente/funcion en si misma
export default function BanderaPais({siglas}: PaisType)
     {
        const [data, setData] = useState([]);
        const [countryName, setName] = useState([]);
        let [countryFlag, setFlag] = useState("");
      
        useEffect(() => {
          const fetchData = async () => {
            const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${siglas}`);
            const jsonData = await response.json();
            setData(jsonData);
            setName(jsonData[0].name.common);
            setFlag(jsonData[0].flags.svg);
          };
          fetchData();
        }, [siglas]);
         /*
         <br></br>
                 <h1 className="font-bold">*** Caja Pais ***</h1>
                 <h2>Pais: {siglas}</h2>
                 <h1>Nombre del país: {countryName}</h1>
                 <h1>Bandera:</h1>
         */
         return (
             <div css={cajaPadre}>
                 <div>
                     <img src={countryFlag} style={{ border: '2px solid #084b8f' }} width="100"></img>
                 </div>
                 <div>
                     {countryName}
                 </div>
             </div>
        );
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
  font-size: 30px;
  font-weight: bold; /* Cambiado a 'font-weight' en lugar de 'font-style' */
  text-align: center; /* Alinea el texto horizontalmente */   /* Centra el texto en cada línea */
`;