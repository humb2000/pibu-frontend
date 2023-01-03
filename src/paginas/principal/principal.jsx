import React from "react";

//MUI IMPORTS
import {Typography } from "@mui/material";

//ESTILOS IMPORTS
import {HomeButton} from "../../estilos/botones";
import './principal.css';

//ACTIVOS
import city from '../../activos/city.jfif'

function Principal() {
    return(
        <>
            <div style={{position: 'relative'}}>
                <img src={city} className={'cityImg'}/>
                <div className={'textoSuperpuesto'}>
                <Typography variant={'h2'} className={'textoPrincipal'}>
                    ENCUENTRA TU <span style={{color: 'green'}}>SIGUIENTE PROPIEDAD</span> EN EL SITIO WEB PIBU
                </Typography>
                    <HomeButton variant={'contained'}>VER TODAS LAS PROPIEDADES</HomeButton>
            </div>
            </div>

        </>
    )
}

export default Principal