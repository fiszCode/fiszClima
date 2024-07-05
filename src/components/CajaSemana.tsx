// Componente utilizado para mostrar la temperatura y la sensación térmica

// Definimos el tipo de variables que vamos a utilizar por parámetros en la funcion/componente en si
interface TemperaturaType
{
     temperatura: string;
     termica: string;
     escala: string;
}

// El componente/funcion en si mismo
export default function CajaTemperatura({temperatura, termica, escala,}: TemperaturaType)
     {
         return (
             <div className="font-bold background-color: blue;">
                 <div>
                     <h2>
                         Temperatura: {temperatura}° {escala}
                         Sensación térmica: {termica}
                     </h2>
                 </div>
             </div>
         );
     }
