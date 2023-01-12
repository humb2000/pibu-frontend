import React, {useContext, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Axios from "axios";

//MUI IMPORTS
import {AppBar, Button, Toolbar, Typography, Menu,
Snackbar, Alert} from "@mui/material";

//ESTILOS IMPORTS
import {LoginButton, PropertyButton} from "../../estilos/botones";
import {MenuItemStyle1, MenuItemStyle2} from "../../estilos/menu-items";
import IconProfile from '../../activos/Icons/profile.png'
import IconLogout from '../../activos/Icons/logout.png'
import './header.css';

//CONTEXT IMPORT
import StateContext from "../../contexts/state-context";
import DispatchContext from "../../contexts/dispatch-context";

function Header(){
    const navigate = useNavigate();

    const GlobalState = useContext(StateContext);
    const GlobalDispatch = useContext(DispatchContext);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function HandleProfile() {
        setAnchorEl(null);
        navigate('/perfil')
    }

    const [openSnack, setOpenSnack] = useState(false)

    async function HandleLogout() {
        setAnchorEl(null);
        const confirmLogout = window.confirm('¿Seguro que se desea desconectar?');
        if (confirmLogout){
            try {
                const response = await Axios.post(
                "http://localhost:8000/api-auth-djoser/token/logout/",
                GlobalState.userToken,
                {
                            headers: {Authorization: 'Token '.concat(GlobalState.userToken)}
                        },
                );
                console.log(response);
                GlobalDispatch({type: 'logout'});
                setOpenSnack(true)
            } catch (e) {
                console.log(e.response);
            }
        }
    }

    useEffect(() => {
        if (openSnack){
            setTimeout(() => {
                navigate(0);
            }, 1500)
        }
    }, [openSnack]);

    return(
        <>
            <AppBar position="static" style={{backgroundColor: 'black'}}>
                <Toolbar>
                    <div className={'leftNav'}>
                        <Button color="inherit" onClick={()=>navigate('/')}>
                            <Typography variant={'h4'}>PIBU</Typography>
                        </Button>
                    </div>
                    <div>
                        <Button color="inherit" onClick={()=>navigate('/listados')}
                                style={{marginRight:'2rem'}}>
                            <Typography variant={'h6'}>Listados</Typography>
                        </Button>
                        <Button color="inherit" onClick={()=>navigate('/agencias')}
                                style={{marginLeft:'2rem'}}>
                            <Typography variant={'h6'}>Agencias</Typography>
                        </Button>
                    </div>
                    <div className={'rightNav'}>
                        <PropertyButton onClick={()=>navigate('/addpropiedad')}>Agregar Propiedad</PropertyButton>

                        {GlobalState.userIsLogged ? (
                            <LoginButton
                                onClick={handleClick}
                                // onClick={()=>navigate('/acceder')}
                            >{GlobalState.userUsername}</LoginButton>
                        ) : (
                            <LoginButton onClick={()=>navigate('/acceder')}>Iniciar Sesion</LoginButton>
                        )}
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                              'aria-labelledby': 'basic-button',}}
                        >

                            <MenuItemStyle1
                                onClick={HandleProfile}
                            >
                               Perfil
                                <img src={IconProfile}
                                     style={{width: '1rem', marginLeft: 'auto', marginRight: '1rem',}}
                                />
                            </MenuItemStyle1>
                            <MenuItemStyle2
                                  onClick={HandleLogout}
                            >
                                Cerrar Sesion
                                <img src={IconLogout}
                                     style={{width: '1rem', marginLeft: 'auto', marginRight: '1rem'}}
                                />
                            </MenuItemStyle2>
                        </Menu>

                        <Snackbar
                            open={openSnack}
                            anchorOrigin={{
                                vertical:'bottom',
                                horizontal:'center'
                            }}
                        >
                            <Alert severity="success" >
                                Ha cerrado sesión correctamente!
                            </Alert>
                        </Snackbar>

                    </div>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Header;