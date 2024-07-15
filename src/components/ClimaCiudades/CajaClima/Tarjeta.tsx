import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export interface TarjetaType
{
     tipo: number;
     titulo: any;
     descripcion: string;
     extra: any;
}

export default function Tarjeta({tipo, titulo, descripcion, extra}: TarjetaType) {
 
     let tituloFinal = titulo
     // Tipos de solicitudes
     // 1 = Reloj
     // 2 = Amanecer
     // 3 = Atardecer
     // 4 = Visibilidad
     // 5 = Humedad
     // 6 = Viento

     if (tipo === 1)
     {
         // Obtener la hora actual en UTC ajustada al uso horario
         let currentUTCTime = Date.now();
         let adjustedTime = currentUTCTime + (extra * 1000);
         let adjustedDate = new Date(adjustedTime);
         // Obtener horas y minutos en formato de 24 horas
         let hours = adjustedDate.getUTCHours().toString().padStart(2, '');
         let minutes = adjustedDate.getUTCMinutes().toString().padStart(2, '0');
         // Formatear el output final
         tituloFinal = `${hours}:${minutes}`;
     }
     if ((tipo === 3) || (tipo === 2))
     {
         // Suponiendo que `titulo` es la marca de tiempo UNIX y `timezoneOffsetSeconds` es la variación en segundos de la zona horaria
         titulo = parseInt(titulo);
             let timezoneOffsetSeconds = extra; // Ejemplo: -14400 para UTC-4 (EDT)
         // Crear el objeto Date desde la marca de tiempo UNIX
         let fecha = new Date(titulo * 1000);
         // Ajustar la fecha según la variación de la zona horaria
         fecha = new Date(fecha.getTime() + timezoneOffsetSeconds * 1000);
         // Obtener horas y minutos ajustados
         let horas = fecha.getUTCHours();
         let minutos = fecha.getUTCMinutes();
         // Asegurarse de que los minutos tengan dos dígitos
         let minuts = minutos < 10 ? '0' + minutos : minutos;
         // Crear la cadena en el formato "HH:MM"
         tituloFinal = horas + ':' + minuts;
     }
     if (tipo === 4)
     {
         let kmh0 = titulo/1000;
         kmh0 = Math.round(kmh0);
         // Retornar el resultado formateado
         tituloFinal = kmh0 + " km/h";
     }
     if (tipo === 6)
     {
         let kmh = titulo * 3.6;
         kmh = Math.round(kmh);
         // Retornar el resultado formateado
         tituloFinal = kmh + " km/h";
     }
      let iurl = "/img/t/" + tipo + ".jpeg"
  return (
    <Card  sx={{minWidth: 250, maxWidth: 250, backgroundColor: '#084b8f', color: 'darkorange', marginRight: '10px'}}>
      <CardMedia
        sx={{ height: 140 }}
        image={iurl}
        title={descripcion}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {tituloFinal}
        </Typography>
        <Typography variant="body2" color="#96a3c9">
        {descripcion}
        </Typography>
      </CardContent>
    </Card>
  );
}