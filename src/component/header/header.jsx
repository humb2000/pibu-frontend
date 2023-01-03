import React from "react";
import {useNavigate} from "react-router-dom";

//MUI IMPORTS
import {AppBar, Button, Toolbar, Typography} from "@mui/material";

//ESTILOS IMPORTS
import {LoginButton, PropertyButton} from "../../estilos/botones";
import './header.css';

function Header(){
    const navegar = useNavigate();
    return(
        <>
            <AppBar position="static" style={{backgroundColor: 'black'}}>
                <Toolbar>
                    <div className={'leftNav'}>
                        <Button color="inherit" onClick={()=>navegar('/')}>
                            <Typography variant={'h4'}>PIBU</Typography>
                        </Button>
                    </div>
                    <div>
                        <Button color="inherit" onClick={()=>navegar('/listados')}>
                            <Typography variant={'h6'}>Listados</Typography>
                        </Button>
                        <Button color="inherit" onClick={()=>navegar('/agencias')}>
                            <Typography variant={'h6'}>Agencias</Typography>
                        </Button>
                    </div>
                    <div className={'rightNav'}>
                        <PropertyButton onClick={()=>navegar('/propiedad')}>Agregar Propiedad</PropertyButton>
                        <LoginButton onClick={()=>navegar('/acceder')}>Acceder</LoginButton>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Header;