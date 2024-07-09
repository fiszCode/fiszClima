// Menu
////////////////////

// Importaciones
import * as React from 'react';
import {IconButton} from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CloudIcon from '@mui/icons-material/Cloud';
import FlagIcon from '@mui/icons-material/Flag';
import MenuIcon from '@mui/icons-material/Menu';

// El componente en si
export default function Menu({pasarMenuToNavBar}: {pasarMenuToNavBar: (pagActualMenu: number) => void }) {
     const [open, setOpen] = React.useState(false);
     const toggleDrawer = (newOpen: boolean) => () => {setOpen(newOpen)};
     const handleDrawerClose = () => {setOpen(false)}
     const DrawerList = (
         <Box sx={{ width: 250}} role="presentation" onClick={toggleDrawer(false)}>
             <List>
                 <ListItem disablePadding>
                     <ListItemButton onClick={()=>pasarMenuToNavBar(1)}>
                         <ListItemIcon>
                             <CloudIcon style={{ color: '#084b8f' }}/>
                         </ListItemIcon>
                         <ListItemText primary="Buscador de ciudades" />
                     </ListItemButton>
                 </ListItem>
             </List>
             <Divider />
             <List>
                 <ListItem disablePadding>
                     <ListItemButton onClick={()=>pasarMenuToNavBar(2)}>
                         <ListItemIcon>
                             <FlagIcon style={{ color: '#084b8f' }}/>
                         </ListItemIcon>
                         <ListItemText primary="Banderas del mundo" />
                     </ListItemButton>
                 </ListItem>
             </List>
         </Box>
     )
     // Return
     return (
         <>
             <IconButton onClick={toggleDrawer(true)} size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
                 <MenuIcon></MenuIcon>
             </IconButton>
             <Drawer
                 anchor="left"
                 open={open}
                 onClose={handleDrawerClose}
                 PaperProps={{
                     sx: {color: '#084b8f', fontWeight: 'bold', marginTop: '64px', height: `calc(100% - 64px)`, backgroundColor: ` #96a3c9` },
                 }}
                 ModalProps={{
                     BackdropProps: {
                         sx: { backgroundColor: 'transparent' },
                         onClick: handleDrawerClose,
                     },
                 }}>
                 {DrawerList}
             </Drawer>
         </>
     );
}