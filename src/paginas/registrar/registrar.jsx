import {useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import Axios from "axios";
import {useImmerReducer} from "use-immer";

//ESTILOS IMPORTS
import './registrar.css'
import {LogInOutButton} from "../../estilos/botones";

//MUI IMPORTS
import {TextField, Grid, Typography} from "@mui/material";


function Registrar() {
    const navigate = useNavigate();

    const initialState = {
        usernameValue: '',
        emailValue: '',
        passwordValue: '',
        password2Value: '',
        sendRequest: 0,
    }

    function ReducerFuction(draft, action) {
        switch (action.type) {
            case 'catchUsernameChange':
                draft.usernameValue = action.usernameChosen
                break;
            case 'catchEmailChange':
                draft.emailValue = action.emailChosen
                break;
            case 'catchPasswordChange':
                draft.passwordValue = action.passwordChosen
                break;
            case 'catchPassword2Change':
                draft.password2Value = action.password2Chosen
                break;
            case 'changeSendRequest':
                draft.sendRequest = draft.sendRequest + 1
                break;
        }
    }

    const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

    function FormSubmit(e) {
        e.preventDefault();
        console.log('el registro a sido mandado')
        dispatch({type: 'changeSendRequest'})
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
                console.log(response)
                navigate('/')
            } catch (error) {
                console.log(error.response);
            }
        }
        SignUp();
        return ()=> {
            source.cancel()
        };
        }
    }, [(state.sendRequest)])

    return (
        <>
            <div className={'formContainer'}>
                <form onSubmit={FormSubmit}>
                    <Grid item container justifyContent={'center'}>
                        <Typography variant={'h4'}>CREAR UNA CUENTA</Typography>
                    </Grid>
                    <Grid item container style={{marginTop: '1rem'}}>
                    <TextField
                        id="username"
                        label={'Nombre'}
                        variant="outlined"
                        fullWidth
                        value={state.usernameValue}
                        onChange={(e) =>
                            dispatch({type: 'catchUsernameChange', usernameChosen: e.target.value,})}
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
                                dispatch({type: 'catchEmailChange', emailChosen: e.target.value,})}
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
                                dispatch({type: 'catchPasswordChange', passwordChosen: e.target.value,})}
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
                                dispatch({type: 'catchPassword2Change', password2Chosen: e.target.value,})}
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
