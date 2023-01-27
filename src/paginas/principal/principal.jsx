import React, {useContext} from "react";

//CONTEXT IMPORT
import StateContext from "../../contexts/state-context";

//MUI IMPORTS
import {Typography} from "@mui/material";

//ESTILOS IMPORTS
import './principal.css';

//ACTIVOS
import city from '../../activos/city.jfif'

function Principal() {
    const GlobalState = useContext(StateContext)

    function WelcomeDisplay() {
        console.log(GlobalState.userIsLogged)
        if (GlobalState.userIsLogged){
            return(
                <Typography variant={'h2'} className={'textoSecundario'}>
                    Bienvenido <br/> <span className={'spamStyle'}>{GlobalState.userUsername}</span>
                </Typography>
            )
        }
    }

    return(
        <>
            <div style={{position: 'relative', backgroundColor:'black'}}>
                <img src={city} className={'cityImg'} alt={' '}/>
                <div className={'textoSuperpuesto'}>
                    <Typography variant={'h2'} className={'textoPrincipal'}>
                        ENCUENTRA TU <span className={'spamStyle'}>SIGUIENTE PROPIEDAD</span> EN EL SITIO WEB PIBU
                    </Typography>

                    <div>
                        {WelcomeDisplay()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Principal