import React, {useState, useEffect, useRef, useMemo, useContext} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Axios from "axios";

//REACT LEAFLET IMPORTS
import { MapContainer, TileLayer, useMap, Marker} from 'react-leaflet'
import {Icon} from "leaflet/dist/leaflet-src.esm";

//MUI IMPORTS
import {Grid, CircularProgress, Breadcrumbs, Link, Typography, IconButton, Button, Dialog} from "@mui/material";
import RoomIcon from '@mui/icons-material/Room';

//CONTEXT IMPORT
import StateContext from "../../contexts/state-context";

//ACTIVOS IMPORT
import defaultProfilePicture from '../../activos/defaultProfilePicture.jpg'

//COMPONENT
import ListingUpdate from "../listing-update";

//ESTILOS IMPORT
import './listado-detalle.css'
import {useImmerReducer} from "use-immer";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";


function ListadoDetalle() {
    const navigate = useNavigate();
    const GlobalState = useContext(StateContext)

    const params = useParams();

    const initialState = {
        dataIsLoading: true,
        listingInfo: '',
        sellerProfileInfo: '',
    }

    function ReducerFuction(draft, action) {
        switch (action.type) {
            case 'catchListingInfo':
                draft.listingInfo = action.listingObject;
                break;
            case 'loadingDone':
                draft.dataIsLoading = false;
                break;
            case 'catchSellerProfileInfo':
                draft.sellerProfileInfo = action.profileObject;
                break;
        }
    }

    const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);


    //===REQUES TODA LA INFORMACION DE LAS LISTAS===
    useEffect(() => {
        async function GetListingInfo() {
            try {
                const response = await Axios.get(`http://localhost:8000/api/listings/${params.id}/`);
                console.log(response.data)
                dispatch({type: 'catchListingInfo', listingObject: response.data})
            }catch (e){
                console.log(e.response);
            }
        }
        GetListingInfo();
    }, []);
    //...REQUES TODA LA INFORMACION DE LAS LISTAS...

    //===REQUES TODA LA INFORMACION DE LOS PERFILES===
    useEffect(() => {
        if (state.listingInfo){
            async function GetProfileInfo() {
                try {
                    const response = await Axios.get(`http://localhost:8000/api/profiles/${state.listingInfo.seller}/`);
                    console.log(response.data)
                    dispatch({type: 'catchSellerProfileInfo', profileObject: response.data})
                    dispatch({type: 'loadingDone'})
                }catch (e){
                    console.log(e.response);
                }
            }
            GetProfileInfo();
        }
    }, [state.listingInfo]);
    //...REQUES TODA LA INFORMACION DE LOS PERFILES...

    //===LISTA DE IMAGENES===
    const listingPictures = [
        state.listingInfo.picture1,
        state.listingInfo.picture2,
        state.listingInfo.picture3,
        state.listingInfo.picture4,
        state.listingInfo.picture5,
    ].filter((pict) => pict !== null)

    const [imagenActual, setImagenActual] = useState(0)

    function NextPict() {
        if (imagenActual === listingPictures.length -1){
            return (setImagenActual(0));
        }else {return setImagenActual(imagenActual + 1);}
    }
    function previousPict() {
        if (imagenActual === 0){
            return (setImagenActual(listingPictures.length -1));
        }else {return setImagenActual(imagenActual - 1);}
    }

    const date = new Date(state.listingInfo.date_posted)
    const formatDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

    //===ELIMINAR PROPIEDAD===
    async function DeleteProp() {
        const confirmDelte = window.confirm(`Seguro que decea eliminar la propiedad: ${state.listingInfo.title}`)
        if (confirmDelte){
            try {
                const response = await Axios.delete(`http://localhost:8000/api/listings/${params.id}/delete/`)
                console.log(response.data)
                navigate('/listados')
            }catch (e) {
                console.log(e.response.date)
            }
        }
    }
    //===ACTUALIZAR PROPIEDAD===
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    if (state.dataIsLoading === true){
        return (
            <Grid container justifyContent={'center'} alignItems={'center'} style={{height: '100vh'}}>
                <CircularProgress />
            </Grid>
        );
    }

    return(

        <div className={'listLink'}>
            <Grid item style={{marginTop:'1rem'}}>
                <Breadcrumbs aria-label={'browser'}>
                    <Link underline={'hover'} color={'inherit'}
                          onClick={() => navigate('/listados')}
                          style={{cursor:'pointer'}}
                    >
                        Listado
                    </Link>

                    <Typography color="text.primary">
                        {state.listingInfo.title}
                    </Typography>
                </Breadcrumbs>
            </Grid>

            {/*===IMAGEN SLIDER===*/}
            {listingPictures.length > 0 ? (
                <Grid className={'sliderContainer'} item container justifyContent={'center'}>
                    {listingPictures.map((picture, index) => {
                        return(
                            <div key={index}>
                                {index === imagenActual ?
                                    <img className={'listImag'} src={picture}/> : ''}
                            </div>
                        );
                    })}
                    <ArrowCircleLeftIcon onClick={previousPict} className={'leftArrow'}/>
                    <ArrowCircleRightIcon onClick={NextPict} className={'rightArrow'}/>
                </Grid>
            ) : ('')}

            {/*===INFORMACION===*/}
            <Grid item container className={'gridInfo'}>
                <Grid item container xs={7} direction={'column'} spacing={1}>
                    <Grid item >
                        <Typography variant={'h5'}>{state.listingInfo.title}</Typography>
                    </Grid>

                    <Grid item >
                        <RoomIcon/>
                        <Typography variant={'h6'}>{state.listingInfo.borough}</Typography>
                    </Grid>

                    <Grid item >
                        <Typography variant={'subtitle1'}>{formatDate}</Typography>
                    </Grid>
                </Grid>

                <Grid item container xs={5} alignItems={'center'}>
                    <Typography variant={'h6'} className={'price'}>
                        {state.listingInfo.property_status === 'Venta'?'':'Renta:'}
                       <br/>
                        {state.listingInfo.listing_type}{' '}
                        | {state.listingInfo.property_status === 'Venta'
                        ? (`$${state.listingInfo.price.toString().replace
                                    (/\B(?=(\d{3})+(?!\d))/g, ",")}`
                        ) : (
                            `$${state.listingInfo.price.toString().replace
                                    (/\B(?=(\d{3})+(?!\d))/g, ",")}/
                                    ${state.listingInfo.rental_frequency}`
                        )}
                    </Typography>
                </Grid>
            </Grid>

            {/*=LOS CHECK BOX Y HABITACIONES TAMBIEN=*/}
            <Grid item container className={'gridInfo'}>
                {state.listingInfo.rooms === 1 ? (
                    <Grid item xs={2} justifyContent={'flex-start'}
                          style={{display:'flex', marginTop:'1rem'}}>
                        <Typography variant={'h6'}>{state.listingInfo.rooms} Habitacion</Typography>
                    </Grid>
                ):(
                    <Grid item xs={2} justifyContent={'flex-start'}
                          style={{display:'flex', marginTop:'1rem'}}>
                        <Typography variant={'h6'}>{state.listingInfo.rooms} Habitaciones</Typography>
                    </Grid>
                )}

                {state.listingInfo.furnished ? (
                    <Grid item xs={2} justifyContent={'flex-start'}
                          style={{display:'flex', marginTop:'1rem'}}>
                        <CheckBoxIcon className={'checkBox'}/>{' '}
                        <Typography variant={'h6'}>Amueblada</Typography>
                    </Grid>
                ):('')}

                {state.listingInfo.pool ? (
                    <Grid item xs={2} style={{display:'flex', marginTop:'1rem'}}>
                        <CheckBoxIcon className={'checkBox'}/>{' '}
                        <Typography variant={'h6'}>Piscina</Typography>
                    </Grid>
                ):('')}

                {state.listingInfo.elevator ? (
                    <Grid item xs={2} style={{display:'flex', marginTop:'1rem'}}>
                        <CheckBoxIcon className={'checkBox'}/>{' '}
                        <Typography variant={'h6'}>Elevador</Typography>
                    </Grid>
                ):('')}

                {state.listingInfo.cctv ? (
                    <Grid item xs={2} style={{display:'flex', marginTop:'1rem'}}>
                        <CheckBoxIcon className={'checkBox'}/>{' '}
                        <Typography variant={'h6'}>TV Cable</Typography>
                    </Grid>
                ):('')}

                {state.listingInfo.parking ? (
                    <Grid item xs={2} style={{display:'flex', marginTop:'1rem'}}>
                        <CheckBoxIcon className={'checkBox'}/>{' '}
                        <Typography variant={'h6'}>Parqueo</Typography>
                    </Grid>
                ):('')}
            </Grid>

            {/*=DESCRIPCION=*/}
            {state.listingInfo.description ?(
                <Grid item className={'gridInfo'}>
                    <Typography variant={'h5'}>
                        Descripcion
                    </Typography>
                    <Typography variant={'h6'}>
                        {state.listingInfo.description}
                    </Typography>
                </Grid>
            ):("")}

        {/*=SELLER INFO=*/}
            <Grid container
                  style={{width: '50%', marginLeft:'auto', marginRight:'auto',
                      border:'5px solid black', marginTop: '1rem', padding:'5px'}}>
                <Grid item xs={6}>
                    <img style={{height:'10rem', width: '15rem', cursor:'pointer'}}
                         src={state.sellerProfileInfo.profile_picture !== null
                             ? state.sellerProfileInfo.profile_picture
                             : defaultProfilePicture
                        }
                         onClick={() => navigate(`/agencias/${state.sellerProfileInfo.seller}`)}
                    />
                </Grid>

                <Grid item container
                      direction={'column'} justifyContent={'center'} xs={6}>
                    <Grid item>
                        <Typography variant={'h5'} style={{textAlign:'center', marginTop:'1rem'}}>
                            <span
                                style={{color:'green', fontWeight:'bolder'}}>
                                {state.sellerProfileInfo.agency_name}
                            </span>
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant={'h5'} style={{textAlign:'center', marginTop:'1rem'}}>
                            <IconButton>
                                <LocalPhoneIcon/> {state.sellerProfileInfo.phone_number}
                            </IconButton>
                        </Typography>
                    </Grid>
                </Grid>

            {/*===ELIMINAR Y ACTUALIZAR BTN===*/}
                {GlobalState.userId == state.listingInfo.seller ? (
                    <Grid item container justifyContent={'space-around'}>
                        <Button variant={'contained'} color={'primary'}
                                onClick={handleClickOpen}
                        >
                            Actualizar
                        </Button>
                        <Button variant={'contained'} color={'error'}
                                onClick={DeleteProp}
                        >
                            Eliminar
                        </Button>
                        <Dialog open={open} onClose={handleClose} fullScreen >
                            <ListingUpdate listingData={state.listingInfo} closeDialog={handleClose}/>
                        </Dialog>
                    </Grid>
                ):('')}


            </Grid>
        </div>

    );
}

export default ListadoDetalle;