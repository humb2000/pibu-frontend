import React, {useEffect, useContext} from 'react';
import {useNavigate} from "react-router-dom";
import Axios from "axios";

//MUI IMPORTS
import {TextField, Grid, Typography, Snackbar, Alert} from "@mui/material";

//CONTEXT IMPORT
import StateContext from "../contexts/state-context";

//ESTILOS IMPORT
import {useImmerReducer} from "use-immer";
import {LogInUpButton, PictureButton} from "../estilos/botones";

function PerfilActualizar(props) {

    const navigate = useNavigate();
    const GlobalState = useContext(StateContext)

    console.log(props.userProfile)

    const initialState = {
        agencyNameValue: props.userProfile.agencyName,
        phoneNumberValue: props.userProfile.phoneNumber,
        bioValue: props.userProfile.bio,
        uploadedPicture: [],
        profilePictureValue: props.userProfile.profilePict,
        sendRequest: 0,
        openSnack: false,
        disableBtn: false,
    }

    function ReducerFuction(draft, action) {
        switch (action.type) {
            case 'catchAgencyNameChange':
                draft.agencyNameValue = action.agencyNameChosen
                break;
            case 'catchPhoneNumberChange':
                draft.phoneNumberValue = action.phoneNumberChosen
                break;
            case 'catchBioChange':
                draft.bioValue = action.bioChosen
                break;
            case 'catchUploadedPicture':
                draft.uploadedPicture = action.uploadedPictureChosen
                break;
            case 'catchProfilePictureChange':
                draft.profilePictureValue = action.profilePictureChosen
                break;
            case 'changeSendRequest':
                draft.sendRequest = draft.sendRequest + 1
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
        }
    }

    const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

    //USE EFFECT DE LA FOTO
    useEffect(() => {
        try {
            if (state.uploadedPicture[0]){
                dispatch({type: 'catchProfilePictureChange', profilePictureChosen: state.uploadedPicture[0]})
            }
        }catch (e) {

        }
    }, [state.uploadedPicture[0]])


    ///===USE EFFECT PARA ENVIO FORMULARIO===
    useEffect(() => {
        if (state.sendRequest){
            async function UpdateProfile() {
                const formData = new FormData()

                if (typeof state.profilePictureValue === 'string' ||
                    state.profilePictureValue === null){
                    formData.append('agency_name', state.agencyNameValue);
                    formData.append('phone_number', state.phoneNumberValue);
                    formData.append('bio', state.bioValue);
                    formData.append('seller', GlobalState.userId);
                }
                else {
                    formData.append('agency_name', state.agencyNameValue);
                    formData.append('phone_number', state.phoneNumberValue);
                    formData.append('bio', state.bioValue);
                    formData.append('profile_picture', state.profilePictureValue);
                    formData.append('seller', GlobalState.userId);
                }
                try {
                    const response = await Axios.patch(
                        `http://localhost:8000/api/profiles/${GlobalState.userId}/update/`,
                        formData)
                    console.log(response.data);
                    dispatch({type:'openTheSnack'});
                }catch (e) {
                    console.log(e.response);
                    dispatch({type: 'allowTheBtn'});
                }
            }
            UpdateProfile()
        }
    }, [state.sendRequest])
    ///...USE EFFECT PARA ENVIO FORMULARIO...

    function FormSubmit(e) {
        e.preventDefault();
        dispatch({type: 'changeSendRequest'});
        dispatch({type: 'disableTheBtn'});
    }

    function ProfilePictureDisplay() {
        if (typeof state.profilePictureValue !== 'string'){
            return(
                <ul>
                    {state.profilePictureValue ? <li>{state.profilePictureValue.name}</li> : ''}
                </ul>
            )
        }
        else {
            return (
                <Grid item style={{marginTop: '0.5rem', marginRight: 'auto', marginLeft: 'auto'}}>
                    <img src={props.userProfile.profilePict}
                         style={{height: '5rem', width: '5rem'}}
                    />
                </Grid>
            );
        }
    }

    useEffect(() => {
        if (state.openSnack){
            setTimeout(() => {
                navigate(0);
            }, 2000)
        }
    }, [state.openSnack]);

    return(
        <>
            <div className={'formContainer'}>
                <form onSubmit={FormSubmit}>
                    <Grid item container justifyContent={'center'}>
                        <Typography variant={'h4'}>MI PERFIL</Typography>
                    </Grid>
                    <Grid item container style={{marginTop: '1rem'}}>
                        <TextField
                            id="agencyName"
                            label="Nombre de la Agencia*"
                            variant="outlined"
                            fullWidth
                            value={state.agencyNameValue}
                            onChange={(e) =>
                                dispatch({type: 'catchAgencyNameChange', agencyNameChosen: e.target.value,})}
                        />
                    </Grid>

                    <Grid item container style={{marginTop: '1rem'}}>
                        <TextField
                            id="phoneNumber"
                            label="Numero de Telefono*"
                            variant="outlined"
                            fullWidth
                            value={state.phoneNumberValue}
                            onChange={(e) =>
                                dispatch({type: 'catchPhoneNumberChange', phoneNumberChosen: e.target.value,})}
                        />
                    </Grid>

                    <Grid item container style={{marginTop: '1rem'}}>
                        <TextField
                            id="bio"
                            label="Biografia"
                            variant="outlined"
                            fullWidth
                            multiline rows={6}
                            value={state.bioValue}
                            onChange={(e) =>
                                dispatch({type: 'catchBioChange', bioChosen: e.target.value,})}
                        />
                    </Grid>

                    <Grid item container>
                        {ProfilePictureDisplay()}
                    </Grid>

                    <Grid item container xs={6} style={{marginTop: '1rem', marginLeft: 'auto', marginRight: 'auto'}}>
                        <PictureButton
                            variant={'contained'} fullWidth component={'label'}>FOTO DE PERFIL
                            <input type={'file'} accept={'image/png, image/gif, image/jpeg'} hidden
                            onChange={(e) =>
                                dispatch({
                                    type: 'catchUploadedPicture',
                                    uploadedPictureChosen: e.target.files,})}/>
                        </PictureButton>
                    </Grid>

                    <Grid item container xs={8} style={{marginTop: '1rem', marginLeft: 'auto', marginRight: 'auto'}}>
                        <LogInUpButton
                            variant={'contained'} fullWidth type={'submit'} disabled={state.disableBtn}>
                            ACTUALIZAR
                        </LogInUpButton>
                    </Grid>

                </form>

                <Snackbar
                    open={state.openSnack}
                    anchorOrigin={{
                        vertical:'bottom',
                        horizontal:'center'
                    }}
                >
                    <Alert severity="success" >
                        Se ha actualizado el perfil correctamente!
                    </Alert>
                </Snackbar>

            </div>
        </>
    )
}

export default PerfilActualizar;