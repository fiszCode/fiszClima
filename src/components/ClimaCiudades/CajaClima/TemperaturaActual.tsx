// Componente utilizado para mostrar la temperatura y la sensación térmica
import {css} from "@emotion/react"; 

// Definimos el tipo de variables que vamos a utilizar por parámetros en la funcion/componente en si
interface TemperaturaType
{
     temperatura: string;
     termica: string;
     escala: string;
     clima: string;
     climaID: string;
     climaDESC: string;
     climaICO: string;
     Tminima: string;
     Tmaxima: string;
}

// El componente/funcion en si mismo
export default function TemperaturaActual({temperatura, termica, escala, clima, climaID, climaDESC, climaICO, Tminima, Tmaxima}: TemperaturaType)
     {
         let tempFinal = parseInt(temperatura), terFinal = parseInt(termica)
         tempFinal = tempFinal - 273.15
         terFinal = terFinal - 273.15
         const textoTemp = tempFinal.toFixed(0) + "°" + escala
         let iconoClima = "https://openweathermap.org/img/wn/" + climaICO + "@2x.png"
         return (
            <div 
            css={padre} 
            style={{}}
          >
                 <div css={hijo} className="margin-right: auto;">
                     {textoTemp.length > 4 && <div css={letraMediana}>{textoTemp}</div>}    
                     {textoTemp.length < 5 && <div css={letraGrande}>{textoTemp}</div>}
                     <div css={letraChica}>
                         MIN: {(parseInt(Tminima)- 273.15).toFixed(0)}°{escala} / MAX: {(parseInt(Tmaxima)- 273.15).toFixed(0)}°{escala}
                     </div>     
                 </div>
                 <div css={hijo} className="margin-left: auto">
                     <img src={iconoClima} alt="Imagen" className="max-width: 100%; max-height: 100%;"></img>
                     <div css={letraChica}>{climaDESC.charAt(0).toUpperCase() + climaDESC.slice(1)}</div>
                     <div css={letraChica}>{terFinal.toFixed(0)}° {escala} de sensación térmica</div>
                 </div>
             </div>
         );
     }

// CSS ---------------------

const padre = css`
     width: 800px;
     height: 200px;
     display: flex;
     justify-content: space-between; /* Espacia los hijos a los lados */
     align-items: center;            /* Centra verticalmente los hijos */
     /* background-color: #e0e0e0;    Centra el texto en cada línea */
`;

const hijo = css`
     width: 50%;
     height: 200px;
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     /* background-color: #3700ff;*/
     text-align: center;
`;

const letraGrande = css`
     font-size: 150px;
     color: #084b8f; /* Cambia el color del texto si es necesario */
`;

const letraMediana = css`
     font-size: 120px;
     color: #084b8f; /* Cambia el color del texto si es necesario */
`;

const letraChica = css`
     font-size: 20px;
     font-weight: bold;
     color: #084b8f; /* Cambia el color del texto si es necesario */
`;