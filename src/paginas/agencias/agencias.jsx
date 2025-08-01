import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import Axios from "axios";

//MUI IMPORTS
import {
    TextField, Grid, Typography, FormControlLabel, Checkbox, CircularProgress,
    Card, CardMedia, CardContent, CardActions, Button
} from "@mui/material";

//ACTIVOS IMPORT
import defaultProfilePicture from '../../activos/defaultProfilePicture.jpg'

//ESTILOS IMPORT
import {useImmerReducer} from "use-immer";
import {CardContentAgencia} from "../../estilos/cards";


function Agencias() {
    const navigate = useNavigate();

    const initialState = {
        dataIsLoading: true,
        agenciesList: [],
    }

    function ReducerFuction(draft, action) {
        switch (action.type) {
            case 'catchAgencies':
                draft.agenciesList = action.agenciesArray;
                break;
            case 'loadingDone':
                draft.dataIsLoading =false;
                break;
        }
    }

    const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

    //===REQUES OBTENER TODS LOS PERFILES===
    useEffect(() => {
        async function GetAgencies() {
            try {
                const response = await Axios.get(`http://localhost:8000/api/profiles/`);
                console.log(response.data)
                dispatch({type: 'catchAgencies', agenciesArray: response.data});
                dispatch({type: 'loadingDone'})
            }catch (e){
                console.log(e.response);
            }
        }
        GetAgencies();
    }, []);
    //...REQUES OBTENER TODS LOS PERFILES...

    if (state.dataIsLoading === true){
        return (
            <Grid container justifyContent={'center'} alignItems={'center'} style={{height: '100vh'}}>
                <CircularProgress />
            </Grid>
        );
    }

    return(
        <>
            <Grid container justifyContent={'flex-start'} spacing={2} style={{padding:'10px'}}>
                {state.agenciesList.map((agency)=>{
                    function PropertiesDisplay() {
                        if (agency.seller_listings.length === 0){
                            return (
                                <Button disabled size={'small'} >No Tiene Propiedades Listadas</Button>
                            );
                        }
                        else if (agency.seller_listings.length === 1){
                            return (
                                <Button size={'small'}
                                    onClick={() => navigate(`/agencias/${agency.seller}`)}
                                >
                                    Una Propiedad Listada
                                </Button>
                            );
                    }
                        else{
                            return(
                                <Button size={'small'}
                                    onClick={() => navigate(`/agencias/${agency.seller}`)}
                                >
                                    {agency.seller_listings.length} Propiedades
                                </Button>
                            );
                        }
                    }

                    if (agency.agency_name && agency.phone_number){
                    return (
                    <Grid item key={agency.id}
                          style={{marginTop:'1rem', maxWidth:'20rem', minWidth:'20rem',
                          }}>
                        <Card>
                            <CardMedia component={'img'} height={'140'} alt={'Foto de Perfil'}
                                       image={agency.profile_picture ? agency.profile_picture : defaultProfilePicture}
                                       onClick={() => navigate(`/agencias/${agency.seller}`)}
                                       style={{cursor:'pointer'}}
                            />
                            <CardContentAgencia>
                                <Typography gutterBottom variant={'h5'} component={'div'}>
                                    {agency.agency_name.substring(0, 40)}
                                    {agency.agency_name.length > 40 ? '...' : ''}
                                </Typography>
                                <Typography variant={'body2'} color={'text.secondary'}>
                                    {agency.bio.substring(0, 100)}
                                    {agency.bio.length > 40 ? '...' : ''}
                                </Typography>
                            </CardContentAgencia>

                            <CardActions>
                                {PropertiesDisplay()}
                            </CardActions>

                        </Card>
                    </Grid>
                    );
                }
            })}
            </Grid>
        </>
    );
}

export default Agencias;