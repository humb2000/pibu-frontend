import React from "react";
import {useNavigate} from "react-router-dom";

//ESTILOS IMPORTS
import './registrar.css'
import {LogInOutButton} from "../../estilos/botones";

//MUI IMPORTS
import {TextField, Grid, Typography, Button} from "@mui/material";


function Registrar() {
    const navigate = useNavigate();
    return (
        <>
            <div className={'formContainer'}>
                <form>
                    <Grid item container justifyContent={'center'}>
                        <Typography variant={'h4'}>CREAR UNA CUENTA</Typography>
                    </Grid>
                    <Grid item container style={{marginTop: '1rem'}}>
                        <TextField id="username" label="Nombre del usuario" variant="outlined" fullWidth />
                    </Grid>
                    <Grid item container style={{marginTop: '1rem'}}>
                        <TextField id="email" label="Correo" variant="outlined" fullWidth />
                    </Grid>
                    <Grid item container style={{marginTop: '1rem'}}>
                        <TextField
                            id="password" label="Contrasena"
                            variant="outlined" fullWidth type={'password'}
                        />
                    </Grid>
                    <Grid item container style={{marginTop: '1rem'}}>
                        <TextField
                            id="confrimpass" label="Confirmar Contrasena"
                            variant="outlined" fullWidth type={'password'}
                        />
                    </Grid>
                    <Grid item container xs={8} style={{marginTop: '1rem', marginLeft: 'auto', marginRight: 'auto'}}>
                        <LogInOutButton
                            variant={'contained'} fullWidth type={'submit'}>Registrar</LogInOutButton>
                    </Grid>

                </form>
                <Grid item container justifyContent={'center'} style={{marginTop: '1rem'}}>
                        <Typography variant={'caption'} >
                            ¿Ya tiene una cuenta?{' '}
                            <span onClick={()=>navigate('/acceder')} style={{cursor: 'pointer', color: 'green'}}>
                                ACCEDER
                            </span>
                        </Typography>
                </Grid>
            </div>
        </>
    )
}

export default Registrar;
