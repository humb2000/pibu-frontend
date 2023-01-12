import React, {useState, useEffect, useRef, useMemo, useContext} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Axios from "axios";

//REACT LEAFLET IMPORTS
import { MapContainer, TileLayer, useMap, Marker} from 'react-leaflet'
import {Icon} from "leaflet/dist/leaflet-src.esm";

//MUI IMPORTS
import {
    TextField,
    Grid,
    Typography,
    FormControlLabel,
    Checkbox,
    CircularProgress,
    Button,
    IconButton, Card, CardMedia, CardContent, CardActions
} from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

//CONTEXT IMPORT
// import StateContext from "../../contexts/state-context";

//ACTIVOS IMPORT
import defaultProfilePicture from '../../activos/defaultProfilePicture.jpg'

//ESTILOS IMPORT
import './agencia-detalle.css'
import icon from '../../activos/Mapicons/position.png'
import {useImmerReducer} from "use-immer";
import {AddButton, LogInUpButton, PictureButton} from "../../estilos/botones";


function AgenciaDetalle() {
    const navigate = useNavigate();
    // const GlobalState = useContext(StateContext)

    const params = useParams();

    const initialState = {

        userProfile: {
            agencyName: '',
            phoneNumber: '',
            profilePict: '',
            bio: '',
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
                const response = await Axios.get(`http://localhost:8000/api/profiles/${params.id}/`);
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
                                <span
                                    style={{color:'green', fontWeight:'bolder'}}>
                                    {state.userProfile.agencyName}
                                </span>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={'h5'} style={{textAlign:'center', marginTop:'1rem'}}>
                                <IconButton>
                                    <LocalPhoneIcon/> {state.userProfile.phoneNumber}
                                </IconButton>
                            </Typography>
                        </Grid>


                    </Grid>
                    <Grid item style={{marginTop:'1rem', padding:'5px'}}>
                        {state.userProfile.bio}
                    </Grid>
                </Grid>

        <>
            <Grid container justifyContent={'flex-start'} spacing={2} style={{padding:'10px'}}>
                {state.userProfile.sellerListings.map((listings)=>{

                    return (
                    <Grid item key={listings.id} style={{marginTop:'1rem', maxWidth:'20rem', minWidth:'20rem'}}>
                        <Card>
                            <CardMedia component={'img'} height={'140'} alt={'Imagen de Listados'}
                                       image={`http://localhost:8000${listings.picture1}`
                                           ? `http://localhost:8000${listings.picture1}`
                                           : defaultProfilePicture}
                                       onClick={() => navigate(`/listados/${listings.id}`)}
                                       style={{cursor:'pointer'}}
                            />
                            <CardContent>
                                <Typography gutterBottom variant={'h5'} component={'div'}>
                                    {listings.title.substring(0, 40)}
                                    {listings.title.length > 40 ? '...' : ''}
                                </Typography>
                                <Typography variant={'body2'} color={'text.secondary'}>
                                    {listings.description.substring(0, 100)}
                                    {listings.description.length > 100 ? '...' : ''}
                                </Typography>
                            </CardContent>

                            <CardActions>
                                {listings.property_status === 'Venta'
                                    ? `${listings.listing_type}: $${listings.price.toString().replace
                                    (/\B(?=(\d{3})+(?!\d))/g, ",")}`
                                    : `${listings.listing_type}: $${listings.price.toString().replace
                                    (/\B(?=(\d{3})+(?!\d))/g, ",")}/${listings.rental_frequency}`}
                            </CardActions>

                        </Card>
                    </Grid>
                    );
            })}
            </Grid>
        </>

            </div>
        </>
    );
}

export default AgenciaDetalle;