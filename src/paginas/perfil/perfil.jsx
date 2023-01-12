import React, {useState, useEffect, useRef, useMemo, useContext} from 'react';
import {useNavigate} from "react-router-dom";
import Axios from "axios";

//REACT LEAFLET IMPORTS
import { MapContainer, TileLayer, useMap, Marker} from 'react-leaflet'
import {Icon} from "leaflet/dist/leaflet-src.esm";

//MUI IMPORTS
import {TextField, Grid, Typography, FormControlLabel, Checkbox, CircularProgress, Button} from "@mui/material";

//CONTEXT IMPORT
import StateContext from "../../contexts/state-context";

//ACTIVOS IMPORT
import defaultProfilePicture from '../../activos/defaultProfilePicture.jpg'

//ESTILOS IMPORT
import './perfil.css'
import icon from '../../activos/Mapicons/position.png'
import {useImmerReducer} from "use-immer";
import {AddButton, LogInUpButton, PictureButton} from "../../estilos/botones";

//COMPONENT IMPORT
import PerfilActualizar from "../../component/perfil-actualizar";


function Perfil() {
    const navigate = useNavigate();
    const GlobalState = useContext(StateContext)

    const initialState = {

        userProfile: {
            agencyName: '',
            phoneNumber: '',
            profilePict: '',
            bio: '',
            sellerId: '',
            sellerListings: [],
        },
        dataIsLoading: true,

    }

    function ReducerFuction(draft, action) {
        switch (action.type) {
            case 'changeUserProfileInfo':
                draft.userProfile.agencyName = action.profileObject.agency_name;
                draft.userProfile.phoneNumber = action.profileObject.phone_number;
                draft.userProfile.profilePict = action.profileObject.profile_picture;
                draft.userProfile.bio = action.profileObject.bio;
                draft.userProfile.sellerListings = action.profileObject.seller_listings;
                draft.userProfile.sellerId = action.profileObject.seller;
                break;
            case 'loadingDone':
                draft.dataIsLoading = false;
                break;
        }
    }

    const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);


    //===REQUES TODA LA INFORMACION DE LOS PERFILES===
    useEffect(() => {
        async function GetProfileInfo() {
            try {
                const response = await Axios.get(`http://localhost:8000/api/profiles/${GlobalState.userId}/`);
                console.log(response.data)
                dispatch({type: 'changeUserProfileInfo', profileObject: response.data})
                dispatch({type: 'loadingDone'})
            }catch (e){
                console.log(e.response);
            }
        }
        GetProfileInfo();
    }, []);
    //...REQUES TODA LA INFORMACION DE LOS PERFILES...


    function PropertiesDisplay() {
        if (state.userProfile.sellerListings.length === 0){
            return (
                <Button disabled size={'large'} >No Tiene Propiedades Listadas</Button>
            );
        }
        else if (state.userProfile.sellerListings.length === 1){
            return (
                <Button size={'large'}
                        onClick={() => navigate(`/agencias/${state.userProfile.sellerId}`)}
                >
                    Tiene Una Propiedad Listada <br/> VER
                </Button>
            );
    }
        else{
            return(
                <Button size={'large'}
                        onClick={() => navigate(`/agencias/${state.userProfile.sellerId}`)}
                >
                    Tiene {state.userProfile.sellerListings.length} Propiedades <br/> VER
                </Button>
            );
        }
    }

    function WelcomeDisplay() {
        if (state.userProfile.agencyName === null ||
            state.userProfile.agencyName === '' ||
            state.userProfile.phoneNumber === null ||
            state.userProfile.phoneNumber === ''
        ) {
            return (
                <Typography variant={'h5'} style={{textAlign:'center', marginTop:'1rem'}}>
                    Bienvenido <span
                    style={{color:'green', fontWeight:'bolder'}}>
                    {GlobalState.userUsername}</span>, por favor rellena el siguiente formulario para
                    actualizar su perfil.
                </Typography>
            );
        }
        else {
            return (
                <Grid container
                      style={{width: '50%', marginLeft:'auto', marginRight:'auto',
                          border:'5px solid black', marginTop: '1rem', padding:'5px'}}>
                    <Grid item xs={6}>
                        <img style={{height:'10rem', width: '15rem'}}
                             src={state.userProfile.profilePict !== null
                                 ? state.userProfile.profilePict
                                 : defaultProfilePicture
                            }
                        />
                    </Grid>

                    <Grid item container
                          direction={'column'} justifyContent={'center'} xs={6}>
                        <Grid item>
                            <Typography variant={'h5'} style={{textAlign:'center', marginTop:'1rem'}}>
                                Bienvenido <span
                                style={{color:'green', fontWeight:'bolder'}}>
                                {GlobalState.userUsername}</span>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={'h5'} style={{textAlign:'center', marginTop:'1rem'}}>
                                {PropertiesDisplay()}
                            </Typography>
                        </Grid>


                    </Grid>

                </Grid>
            );
        }
    }

    if (state.dataIsLoading === true){
        return (
            <Grid container justifyContent={'center'} alignItems={'center'} style={{height: '100vh'}}>
                <CircularProgress />
            </Grid>
        );
    }

    return(
        <>
            <div>
                {WelcomeDisplay()}
            </div>

            <PerfilActualizar userProfile={state.userProfile}/>
        </>
    )
}

export default Perfil;