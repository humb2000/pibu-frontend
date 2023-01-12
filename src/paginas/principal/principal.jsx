import React, {useEffect, useContext} from "react";

//CONTEXT IMPORT
import StateContext from "../../contexts/state-context";

//MUI IMPORTS
import {Snackbar, Typography, Alert} from "@mui/material";

//ESTILOS IMPORTS
import {HomeButton} from "../../estilos/botones";
import './principal.css';

//ACTIVOS
import city from '../../activos/city.jfif'

function Principal() {
    const GlobalState = useContext(StateContext)

    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        if (GlobalState.userIsLogged) {
            setOpen(true)
        }
        setTimeout(() => {
            setOpen(false)
        }, 3000);
    }, [])


    return(
        <>
            <div style={{position: 'relative'}}>
                <img src={city} className={'cityImg'} alt={' '}/>
                <div className={'textoSuperpuesto'}>
                <Typography variant={'h2'} className={'textoPrincipal'}>
                    ENCUENTRA TU <span style={{color: 'green'}}>SIGUIENTE PROPIEDAD</span> EN EL SITIO WEB PIBU
                </Typography>
                    <HomeButton variant={'contained'}>VER TODAS LAS PROPIEDADES</HomeButton>
            </div>
            </div>
            <Snackbar
                open={open}
                anchorOrigin={{
                    vertical:'bottom',
                    horizontal:'center'
                }}
            >
                <Alert severity="success" >
                    Ha iniciado sesión correctamente
                </Alert>
            </Snackbar>
        </>
    )
}

export default Principal

// dispatch({type: 'openTheSnackbar'})


// case 'openTheSnackbar':
//      draft.openSnackbar = true
//      break;

// openSnackbar: false,


// <Snackbar
//     open={state.openSnackbar}
//     message={'Ha iniciado sesión correctamente'}
//     anchorOrigin={{
//         vertical:'bottom',
//         horizontal:'center'
//     }}
// />

