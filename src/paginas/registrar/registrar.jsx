import React, {useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import Axios from "axios";
import {useImmerReducer} from "use-immer";

//ESTILOS IMPORTS
import './registrar.css'
import {LogInUpButton} from "../../estilos/botones";

//MUI IMPORTS
import {TextField, Grid, Typography, Snackbar, Alert} from "@mui/material";


function Registrar() {
    const navigate = useNavigate();

    const initialState = {
        usernameValue: '',
        emailValue: '',
        passwordValue: '',
        password2Value: '',
        sendRequest: 0,
        openSnack: false,
        disableBtn: false,
        usernameErrors: {
            hasErrors: false,
            errorMessage: '',
        },
        emailErrors: {
            hasErrors: false,
            errorMessage: '',
        },
        passwordErrors: {
            hasErrors: false,
            errorMessage: '',
        },
        password2HelperText: '',
        serverMessageUsername: '',
        serverMessageEmail: '',
        serverMessageSimilarPassword: '',
        serverMessageCommonPassword: '',
        serverMessageNumericPassword: '',
    };

    function ReducerFuction(draft, action) {
        switch (action.type) {
            case 'catchUsernameChange':
                draft.usernameValue = action.usernameChosen;
                draft.usernameErrors.hasErrors = false;
                draft.usernameErrors.errorMessage = '';
                draft.serverMessageUsername = '';
                break;
            case 'catchEmailChange':
                draft.emailValue = action.emailChosen;
                draft.emailErrors.hasErrors = false;
                draft.emailErrors.errorMessage = '';
                draft.serverMessageEmail = '';
                break;
            case 'catchPasswordChange':
                draft.passwordValue = action.passwordChosen;
                draft.passwordErrors.hasErrors = false;
                draft.passwordErrors.errorMessage = '';
                draft.serverMessageSimilarPassword = '';
                draft.serverMessageCommonPassword = '';
                draft.serverMessageNumericPassword = '';
                break;
            case 'catchPassword2Change':
                draft.password2Value = action.password2Chosen;
                if (action.password2Chosen !== draft.passwordValue){
                    draft.password2HelperText = 'La contraseña debe coincidir.'
                }else if (action.password2Chosen === draft.passwordValue){
                    draft.password2HelperText = '';
                }
                break;
            case 'changeSendRequest':
                draft.sendRequest = draft.sendRequest + 1;
                break;
            case 'openTheSnack':
                draft.openSnack = true
                break;
            case 'disableTheBtn':
                draft.disableBtn = true
                break;
            case 'allowTheBtn':
                draft.disableBtn = false
                break;
            case 'catchUsernameErrors':
                if (action.usernameChosen.length === 0){
                    draft.usernameErrors.hasErrors = true;
                    draft.usernameErrors.errorMessage = 'Este campo no puede estar vacio.';
                }else if (action.usernameChosen.length < 5){
                    draft.usernameErrors.hasErrors = true;
                    draft.usernameErrors.errorMessage = 'El nombre de usuario debe tener al menos 5 caracteres.';
                }else if (!/^([a-zA-Z0-9]+)$/.test(action.usernameChosen)){
                    draft.usernameErrors.hasErrors = true;
                    draft.usernameErrors.errorMessage = 'Este campo solo puede contener caracteres alfa-numericos.';
                }
                break;
            case 'catchEmailErrors':
                if
(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    action.emailChosen)){
                    draft.emailErrors.hasErrors = true;
                    draft.emailErrors.errorMessage = 'Por favor introdusca un correo valido.';
                }
                break;
            case 'catchPasswordErrors':
                if (action.passwordChosen.length < 8){
                    draft.passwordErrors.hasErrors = true;
                    draft.passwordErrors.errorMessage = 'La contraseña debe tener al menos 8 caracteres.';
                }
                break;
            case 'usernameExist':
                draft.serverMessageUsername = 'Este nombre de usuario ya existe!';
                break;
            case 'emailExist':
                draft.serverMessageEmail = 'Este correo ya existe!';
                break;
            case 'similarPassword':
                draft.serverMessageSimilarPassword = 'La contraseña es similar al nombre de usuario!'
                break;
            case 'commonPassword':
                draft.serverMessageCommonPassword = 'La contraseña es muy comun!'
                break;
            case 'numericPassword':
                draft.serverMessageNumericPassword = 'La contraseña no puede contener solo numeros!'
                break;

        }
    }

    const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

    function FormSubmit(e) {
        e.preventDefault();
        console.log('el registro a sido mandado')
        if (!state.usernameErrors.hasErrors &&
            !state.emailErrors.hasErrors &&
            !state.passwordErrors.hasErrors &&
            state.password2HelperText === ''
        ){
            dispatch({type: 'changeSendRequest'})
            dispatch({type: 'disableTheBtn'})
        }
    }

    useEffect(() => {
        if (state.sendRequest){
            const source = Axios.CancelToken.source();
        async function SignUp() {
            try {
                const response = await Axios.post(
                    "http://localhost:8000/api-auth-djoser/users/",
                    {
                        username: state.usernameValue,
                        email: state.emailValue,
                        password: state.passwordValue,
                        re_password: state.password2Value ,
                    },
                    {cancelToken: source.token}
                );
                console.log(response);
                dispatch({type:'openTheSnack'});
            } catch (e) {
                dispatch({type: 'allowTheBtn'});
                console.log(e.response);
                if (e.response.data.username){
                    dispatch({type: 'usernameExist'});
                } else if (e.response.data.email){
                    dispatch({type: 'emailExist'});
                } else if (e.response.data.password[0] === 'The password is too similar to the username.'){
                    dispatch({type: 'similarPassword'});
                } else if (e.response.data.password[0] === 'This password is too common.'){
                    dispatch({type: 'commonPassword'});
                } else if (e.response.data.password[0] === 'This password is entirely numeric.'){
                    dispatch({type: 'numericPassword'});
                }
            }
        }
        SignUp();
        return ()=> {
            source.cancel()
        };
        }
    }, [(state.sendRequest)])

    useEffect(() => {
        if (state.openSnack){
            setTimeout(() => {
                navigate('/acceder');
            }, 2000)
        }
    }, [state.openSnack]);

    return (
        <>
            <div className={'formContainer'}>
                <form onSubmit={FormSubmit}>

                    <Grid item container justifyContent={'center'}>
                        <Typography variant={'h4'}>CREAR UNA CUENTA</Typography>
                    </Grid>

                    {/*===ERRORES DE EXISTENCIA===*/}
                    {state.serverMessageUsername ? (
                        <Alert severity={'error'}>{state.serverMessageUsername}</Alert>
                    ):('')}

                    {state.serverMessageEmail ? (
                        <Alert severity={'error'}>{state.serverMessageEmail}</Alert>
                    ):('')}

                    {state.serverMessageSimilarPassword ? (
                        <Alert severity={'error'}>{state.serverMessageSimilarPassword}</Alert>
                    ):('')}

                    {state.serverMessageCommonPassword ? (
                        <Alert severity={'error'}>{state.serverMessageCommonPassword}</Alert>
                    ):('')}

                    {state.serverMessageNumericPassword ? (
                        <Alert severity={'error'}>{state.serverMessageNumericPassword}</Alert>
                    ):('')}


                    <Grid item container style={{marginTop: '1rem'}}>
                        <TextField
                            id="username"
                            label={'Nombre'}
                            variant="outlined"
                            fullWidth
                            value={state.usernameValue}
                            onChange={(e) =>
                                dispatch({type: 'catchUsernameChange',
                                    usernameChosen: e.target.value,})}
                            onBlur={(e) =>
                                dispatch({type: 'catchUsernameErrors',
                                    usernameChosen: e.target.value,})}
                            error={state.usernameErrors.hasErrors}
                            helperText={state.usernameErrors.errorMessage}
                            >
                        </TextField>
                    </Grid>
                    <Grid item container style={{marginTop: '1rem'}}>
                        <TextField
                            id="email"
                            label="Correo"
                            variant="outlined"
                            fullWidth
                            value={state.emailValue}
                            onChange={(e) =>
                                dispatch({type: 'catchEmailChange',
                                    emailChosen: e.target.value,})}
                            onBlur={(e) =>
                                dispatch({type: 'catchEmailErrors',
                                    emailChosen: e.target.value,})}
                            error={state.emailErrors.hasErrors}
                            helperText={state.emailErrors.errorMessage}
                        />
                    </Grid>
                    <Grid item container style={{marginTop: '1rem'}}>
                        <TextField
                            id="password"
                            label="Contrasena"
                            variant="outlined"
                            fullWidth
                            type='password'
                            value={state.passwordValue}
                            onChange={(e) =>
                                dispatch({type: 'catchPasswordChange',
                                    passwordChosen: e.target.value,})}
                            onBlur={(e) =>
                                dispatch({type: 'catchPasswordErrors',
                                    passwordChosen: e.target.value,})}
                            error={state.passwordErrors.hasErrors}
                            helperText={state.passwordErrors.errorMessage}

                        />
                    </Grid>
                    <Grid item container style={{marginTop: '1rem'}}>
                        <TextField
                            id="password2"
                            label="Contrasena"
                            variant="outlined"
                            fullWidth
                            type='password'
                            value={state.password2Value}
                            onChange={(e) =>
                                dispatch({type: 'catchPassword2Change',
                                    password2Chosen: e.target.value,})}
                            helperText={state.password2HelperText}
                        />
                    </Grid>
                    <Grid item container xs={8} style={{marginTop: '1rem', marginLeft: 'auto', marginRight: 'auto'}}>
                        <LogInUpButton
                            variant={'contained'} fullWidth type={'submit'} disabled={state.disableBtn}>
                            Registrar
                        </LogInUpButton>
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

                <Snackbar
                    open={state.openSnack}
                    anchorOrigin={{
                        vertical:'bottom',
                        horizontal:'center'
                    }}
                >
                    <Alert severity="success" >
                        Se ha creado la cuenta correctamente!
                    </Alert>
                </Snackbar>
            </div>
        </>
    )
}

export default Registrar;
