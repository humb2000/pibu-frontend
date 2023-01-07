import React from "react";
import {useNavigate} from "react-router-dom";

//ESTILOS IMPORTS
import './acceder.css'
import {LogInOutButton} from "../../estilos/botones";

//MUI IMPORTS
import {TextField, Grid, Typography} from "@mui/material";


function Acceder() {
    const navigate = useNavigate();
    return (
        <>
            <div className={'formContainer'}>
                <form>
                    <Grid item container justifyContent={'center'}>
                        <Typography variant={'h4'}>ACCEDER</Typography>
                    </Grid>
                    <Grid item container style={{marginTop: '1rem'}}>
                        <TextField id="username" label="Nombre del usuario" variant="outlined" fullWidth />
                    </Grid>

                    <Grid item container style={{marginTop: '1rem'}}>
                        <TextField
                            id="password" label="Contrasena"
                            variant="outlined" fullWidth type={'password'}
                        />
                    </Grid>

                    <Grid item container xs={8} style={{marginTop: '1rem', marginLeft: 'auto', marginRight: 'auto'}}>
                        <LogInOutButton
                            variant={'contained'} fullWidth type={'submit'}>ACCEDER</LogInOutButton>
                    </Grid>

                </form>
                <Grid item container justifyContent={'center'} style={{marginTop: '1rem'}}>
                        <Typography variant={'caption'} >
                            ¿No tiene una cuenta?{' '}
                            <span onClick={()=>navigate('/registrar')} style={{cursor: 'pointer', color: 'green'}}>
                                REGISTRESE
                            </span>
                        </Typography>
                </Grid>
            </div>
        </>
    )
}

export default Acceder;
