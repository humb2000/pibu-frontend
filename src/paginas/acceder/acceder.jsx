import React, {useEffect, useContext} from "react";
import Axios from "axios";
import {useNavigate} from "react-router-dom";
import {useImmerReducer} from "use-immer";

//ESTILOS IMPORTS
import './acceder.css'
import {LogInUpButton} from "../../estilos/botones";

//MUI IMPORTS
import {TextField, Grid, Typography, Snackbar, Alert} from "@mui/material";

//CONTEXT IMPORT
import DispatchContext from "../../contexts/dispatch-context";


function Acceder() {

    const navigate = useNavigate();

    const GlobalDispatch = useContext(DispatchContext)

    const initialState = {
        usernameValue: '',
        passwordValue: '',
        sendRequest: 0,
        token: '',
        openSnack: false,
        disableBtn: false,
        serverError: false,
    }

    function ReducerFuction(draft, action) {
        switch (action.type) {
            case 'catchUsernameChange':
                draft.usernameValue = action.usernameChosen;
                draft.serverError =false;
                break;
            case 'catchPasswordChange':
                draft.passwordValue = action.passwordChosen;
                draft.serverError =false;
                break;
            case 'changeSendRequest':
                draft.sendRequest = draft.sendRequest + 1;
                break;
            case 'catchToken':
                draft.token = action.tokenValue;
                break;
            case 'openTheSnack':
                draft.openSnack = true;
                break;
            case 'disableTheBtn':
                draft.disableBtn = true;
                break;
            case 'allowTheBtn':
                draft.disableBtn = false;
                break;
            case 'catchServerError':
                draft.serverError = true;
                break;
        }
    }

    const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

    function FormSubmit(e) {
        e.preventDefault();
        console.log('el formulario a sido mandado');
        dispatch({type: 'changeSendRequest'});
        dispatch({type: 'disableTheBtn'});
    }

    useEffect(() => {
        if (state.sendRequest){
            const source = Axios.CancelToken.source();
        async function SignIn() {
            try {
                const response = await Axios.post(
                    "http://localhost:8000/api-auth-djoser/token/login/",
                    {
                        username: state.usernameValue,
                        password: state.passwordValue,
                    },
                    {cancelToken: source.token}
                );
                console.log(response)
                dispatch({type: 'catchToken', tokenValue: response.data.auth_token});
                GlobalDispatch(
                    {type: 'catchToken', tokenValue: response.data.auth_token}
                )
            } catch (error) {
                dispatch({type: 'allowTheBtn'});
                console.log(error.response);
                dispatch({type:'catchServerError'})
            }
        }
        SignIn();
        return ()=> {
            source.cancel()
        };
        }
    }, [(state.sendRequest)])

    //GET USER EFFECT
    useEffect(() => {
        if (state.token !== ''){
            const source = Axios.CancelToken.source();
        async function GetUserInfo() {
            try {
                const response = await Axios.get(
                    "http://localhost:8000/api-auth-djoser/users/me/",
                    {
                        headers: {Authorization: 'Token '.concat(state.token)}
                    },
                    {cancelToken: source.token}
                );
                console.log(response)
                GlobalDispatch({type: 'userSignIn',
                    usernameInfo: response.data.username,
                    emailInfo: response.data.email,
                    idInfo: response.data.id,
                })
                dispatch({type:'openTheSnack'});
            } catch (error) {
                console.log(error.response);
            }
        }
        GetUserInfo();
        return ()=> {
            source.cancel()
        };
        }
    }, [(state.token)])

    useEffect(() => {
        if (state.openSnack){
            setTimeout(() => {
                navigate('/');
            }, 1500)
        }
    }, [state.openSnack]);

    return (
        <>
            <div className={'formContainer'}>
                <form onSubmit={FormSubmit}>
                    <Grid item container justifyContent={'center'}>
                        <Typography variant={'h4'}>ACCEDER</Typography>
                    </Grid>

                    {state.serverError ? (
                        <Alert severity={'error'}>Usuario o Contraseña incorrecto!</Alert>
                    ):('')}


                    <Grid item container style={{marginTop: '1rem'}}>
                        <TextField
                            id="username"
                            label="Nombre del usuario"
                            variant="outlined"
                            fullWidth
                            value={state.usernameValue}
                            onChange={(e) =>
                                dispatch({type: 'catchUsernameChange', usernameChosen: e.target.value,})}
                            error={state.serverError}
                        />
                    </Grid>

                    <Grid item container style={{marginTop: '1rem'}}>
                        <TextField
                            id="password"
                            label="Contrasena"
                            variant="outlined"
                            fullWidth type={'password'}
                            value={state.passwordValue}
                            onChange={(e) =>
                                dispatch({type: 'catchPasswordChange', passwordChosen: e.target.value,})}
                            error={state.serverError}
                        />
                    </Grid>

                    <Grid item container xs={8} style={{marginTop: '1rem', marginLeft: 'auto', marginRight: 'auto'}}>
                        <LogInUpButton
                            variant={'contained'} fullWidth type={'submit'} disabled={state.disableBtn}>
                            ACCEDER
                        </LogInUpButton>
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

                <Snackbar
                    open={state.openSnack}
                    anchorOrigin={{
                        vertical:'bottom',
                        horizontal:'center'
                    }}
                >
                    <Alert severity="success" >
                        Ha iniciado sesión correctamente!
                    </Alert>
                </Snackbar>

            </div>
        </>
    )
}

export default Acceder;
