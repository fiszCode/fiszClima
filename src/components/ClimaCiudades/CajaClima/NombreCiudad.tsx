import { css } from "@emotion/react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { agregarCiudadFavorita, quitarCiudadFavorita } from '@/store/slices/ciudadesFavoritasSlice';

import React, { useState, useEffect} from 'react';
import { RootState } from "@/store/store";
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

interface CiudadType {
    ciudad: string;
}

export default function NombreCiudad({ ciudad }: CiudadType) {

    //let ciudadesFavoritas = useSelector((state) => state.ciudadesFavoritas)

    const CityFav = useTypedSelector(state => state.ciudadesFavoritas);
    //const CityFav = useSelector((state) => state.ciudadesFavoritas)
    
    const dispatch = useDispatch();

    const ciudadActual = useTypedSelector(state => state.ciudadActual.ciudadActual)

    const esFavorita = CityFav.ciudadesFavoritas.includes(ciudad);

    const handleEstrellaClick = () => {
        if (esFavorita) {
            dispatch(quitarCiudadFavorita(ciudad));
        } else {
            dispatch(agregarCiudadFavorita(ciudad));
        }
    };
    
    ciudad ? ciudad: ciudad = ciudadActual

    return (
        <div css={cajaPadre}>
             {ciudad.length > 12 && <div css={letraMediana}>{ciudad}</div>}    
             {ciudad.length < 13 && <div css={letraGrande}>{ciudad}</div>}  
            <div css={estrella} onClick={handleEstrellaClick}>
                {esFavorita ? <FaStar /> : <FaRegStar />}
            </div>
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
  align-items: center; /* Centra horizontalmente */  
  color: #084b8f; /* Cambia el color del texto si es necesario */
  font-weight: bold; /* Cambiado a 'font-weight' en lugar de 'font-style' */
  text-align: center; /* Alinea el texto horizontalmente */
  position: relative;
`;

const estrella = css`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 40px;
  cursor: pointer;
  color: #FFD700; /* Color dorado para la estrella */
`;

const letraGrande = css`
     font-size: 75px;
     justify-content: flex-start; /* Centra verticalmente arriba */
`;

const letraMediana = css`
     font-size: 50px;
     justify-content: center;
`;