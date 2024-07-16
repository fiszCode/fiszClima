import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, TypedUseSelectorHook} from 'react-redux';
import { RootState } from "@/store/store";
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import IconButton from '@mui/material/IconButton';
import { Badge } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import { FaStar, FaRegStar } from "react-icons/fa";
import { agregarCiudadFavorita, quitarCiudadFavorita } from '@/store/slices/ciudadesFavoritasSlice';

const IconoFavoritos = () => {
  const consultas = useTypedSelector((state) => state.ciudadesFavoritas.ciudadesFavoritas);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (consultas.length === 0) {
      handleClose();
    }
  }, [consultas]);

  const handleClick = (event:any) => {
    if (consultas.length > 0) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (consulta:any) => {
    dispatch(quitarCiudadFavorita(consulta));
  };

  const handleSeleccionCiudad = (consulta:any) => {
     console.log("Clic en ciudad");
  };

  return (
    <>
      <IconButton size="large" edge="end" color="inherit" aria-label="icon2" onClick={handleClick}>
        <Badge badgeContent={consultas.length} color="error">
          {consultas.length > 0 ? <FaStar /> : <FaRegStar />}
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {consultas.map((consulta, index) => (
          <MenuItem key={index}>
            <ListItemText primary={consulta} onClick={() => handleSeleccionCiudad(consulta)} />
            <ListItemIcon onClick={() => handleDelete(consulta)}>
              <IconButton edge="end" color="secondary">
                <DeleteIcon />
              </IconButton>
            </ListItemIcon>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default IconoFavoritos;
