import React, {useEffect, useContext} from "react";
import Axios from "axios";
import {useNavigate} from "react-router-dom";
import {useImmerReducer} from "use-immer";

//ESTILOS IMPORTS
import './acceder.css'
import {LogInUpButton} from "../../estilos/botones";

//MUI IMPORTS
import {TextField, Grid, Typography} from "@mui/material";

//CONTEXT IMPORT
import DispatchContext from "../../contexts/dispatch-context";
import StateContext from "../../contexts/state-context";

function Acceder() {

    const navigate = useNavigate();

    const GlobalDispatch = useContext(DispatchContext)
    const GlobalState = useContext(StateContext)

    const initialState = {
        usernameValue: '',
        passwordValue: '',
        sendRequest: 0,
        token: '',
    }

    function ReducerFuction(draft, action) {
        switch (action.type) {
            case 'catchUsernameChange':
                draft.usernameValue = action.usernameChosen
                break;
            case 'catchPasswordChange':
                draft.passwordValue = action.passwordChosen
                break;
            case 'changeSendRequest':
                draft.sendRequest = draft.sendRequest + 1
                break;
            case 'catchToken':
                draft.token = action.tokenValue
                break;
        }
    }

    const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

    function FormSubmit(e) {
        e.preventDefault();
        console.log('el formulario a sido mandado')
        dispatch({type: 'changeSendRequest'})
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
                // navigate('/')
            } catch (error) {
                console.log(error.response);
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
                navigate('/')
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

    return (
        <>
            <div className={'formContainer'}>
                <form onSubmit={FormSubmit}>
                    <Grid item container justifyContent={'center'}>
                        <Typography variant={'h4'}>ACCEDER</Typography>
                    </Grid>
                    <Grid item container style={{marginTop: '1rem'}}>
                        <TextField
                            id="username"
                            label="Nombre del usuario"
                            variant="outlined"
                            fullWidth
                            value={state.usernameValue}
                            onChange={(e) =>
                                dispatch({type: 'catchUsernameChange', usernameChosen: e.target.value,})}
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
                        />
                    </Grid>

                    <Grid item container xs={8} style={{marginTop: '1rem', marginLeft: 'auto', marginRight: 'auto'}}>
                        <LogInUpButton
                            variant={'contained'} fullWidth type={'submit'}>ACCEDER</LogInUpButton>
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
