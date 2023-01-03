import React from "react";

import {CssBaseline, AppBar, Toolbar, Button, Typography } from "@mui/material";

import {LoginButton, PropertyButton} from "../../estilos/botones";
import './principal.css'

function Principal() {
    return(
        <>
            <CssBaseline/>
            <AppBar position="static" style={{backgroundColor: 'black'}}>
                <Toolbar>
                    <div className={'leftNav'}>
                        <Button color="inherit"><Typography variant={'h4'}>PIBU</Typography></Button>
                    </div>
                    <div>
                        <Button color="inherit"><Typography variant={'h6'}>Listados</Typography></Button>
                        <Button color="inherit"><Typography variant={'h6'}>Agencias</Typography></Button>
                    </div>
                    <div className={'rightNav'}>
                        <PropertyButton>Agregar Propiedad</PropertyButton>
                        <LoginButton >Acceder</LoginButton>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Principal