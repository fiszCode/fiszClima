// NombreCiudad
////////////////////
// Componente utilizado para mostrar la ciudad
////////////////////

import {css} from "@emotion/react"; 


interface CiudadType
{
     ciudad: string;
}
export default function NombreCiudad({ciudad}: CiudadType)
     {
         return (
             <div css={cajaPadre}>
                 {ciudad}
             </div>
         );
     }

// CSS ---------------------

const cajaPadre = css`
  min-width: 600px;
  width: auto;
  height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Centra verticalmente arriba */
  align-items: center; /* Centra horizontalmente */
  /* background-color: orange; */
  
  color: #084b8f; /* Cambia el color del texto si es necesario */
  font-size: 75px;
  font-weight: bold; /* Cambiado a 'font-weight' en lugar de 'font-style' */
  text-align: center; /* Alinea el texto horizontalmente */
`;
