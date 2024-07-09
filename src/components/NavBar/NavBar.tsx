// NavBar
////////////////////

// Dependencias usadas por Material UI
import { AppBar, Box, Toolbar, IconButton, Typography} from '@mui/material';
import IconPlaceholder from '@mui/icons-material/HelpOutline'; // Placeholder icon, replace with your desired icons

import Menu from '@/components/NavBar/Menu';
import BuscadorCiudades from '@/components/NavBar/BuscadorCiudades';

// El componente en sí

type NavBarProps = {
    pasarNavBarToApp: (coordenadas: { lonNavBar: number; latNavBar: number; }) => void;
    pasarPagActualToApp: (pagActualMenu: number) => void;
  };
  
  export default function NavBar({pasarNavBarToApp, pasarPagActualToApp}: NavBarProps) {
     return (
     <Box sx={{ flexGrow: 1 }}>
         <AppBar position="fixed">
             <Toolbar>
                 <Menu pasarMenuToNavBar={(pagActualMenu) =>{pasarPagActualToApp(pagActualMenu)}} />
                 <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                     fiszClima
                 </Typography>
                 <Box sx={{ flexGrow: 1 }} />
                     <BuscadorCiudades pasarCiudadToNavBar={({ lon, lat }) =>{
                        pasarNavBarToApp({lonNavBar: lon, latNavBar: lat})}}/>
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