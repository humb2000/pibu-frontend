import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import Axios from "axios";

//MUI IMPORTS
import {TextField, Grid, Typography, Button} from "@mui/material";

//ESTILOS IMPORT
import './add-propiedad.css'
import {useImmerReducer} from "use-immer";


function AddPropiedad() {

    const navigate = useNavigate();

    const initialState = {
        tituloValue: '',
        listingTypeValue: '',
        descripcionValue: '',
        areaValue: '',
        ciudadValue: '',
        latitudeValue: '',
        longitudeValue: '',
        propertyStatusValue: '',
        priceValue: '',
        rentalFrequencyValue: '',
        roomsValue: '',
        funishedValue: false,
        poolValue: false,
        elevatorValue: false,
        cctvValue: false,
        parkingValue: false,
    }

    function ReducerFuction(draft, action) {
        switch (action.type) {
            case 'catchTituloChange':
                draft.tituloValue = action.tituloChosen
                break;
            case 'catchListingTypeChange':
                draft.listingTypeValue = action.listingTypeChosen
                break;

        }
    }

    const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

    function FormSubmit(e) {
        e.preventDefault();
        console.log('el registro a sido mandado')
        // dispatch({type: 'changeSendRequest'})
    }

    return (
        <>
            <div className={'formContainer'}>
                <form onSubmit={FormSubmit}>
                    <Grid item container justifyContent={'center'}>
                        <Typography variant={'h4'}>AGREGAR UNA PROPIEDAD</Typography>
                    </Grid>
                    <Grid item container style={{marginTop: '1rem'}}>
                        <TextField
                            id="titulo"
                            label="Titulo"
                            variant="outlined"
                            fullWidth
                            value={state.tituloValue}
                            onChange={(e) =>
                                dispatch({type: 'catchTituloChange', tituloChosen: e.target.value,})}
                        />
                    </Grid>


                    <Grid item container xs={8} style={{marginTop: '1rem', marginLeft: 'auto', marginRight: 'auto'}}>
                        <Button
                            variant={'contained'} fullWidth type={'submit'}>Agregar</Button>
                    </Grid>

                </form>

            </div>
        </>
    )
}

export default AddPropiedad;
