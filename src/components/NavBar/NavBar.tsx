// NavBar
////////////////////
// 
////////////////////

// Dependencias usadas por Material UI
import { AppBar, Box, Toolbar, IconButton, Typography, InputBase, List, ListItem, ListItemText, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import IconPlaceholder from '@mui/icons-material/HelpOutline'; // Placeholder icon, replace with your desired icons

import Menu from '@/components/NavBar/Menu';
import BuscadorCiudades from '@/components/NavBar/BuscadorCiudades';

// El componente en sí
export default function NavBar({ onCityClick }: { onCityClick: (coordenadas: { lon: number, lat: number }) => void })
{
     return (
     <Box sx={{ flexGrow: 1 }}>
         <AppBar position="fixed">
             <Toolbar>
                 <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
                     <MenuIcon/>
                     {/*<Menu/>*/}
                 </IconButton>
                 <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                     fiszClima
                 </Typography>
                 <Box sx={{ flexGrow: 1 }} />
                     <BuscadorCiudades onCityClick={({ lon, lat }) =>{onCityClick({ lon: lon, lat: lat})}}/>
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
     )
}