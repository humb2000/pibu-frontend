import React, {useEffect, useContext} from 'react';
import {useNavigate} from "react-router-dom";
import Axios from "axios";

//MUI IMPORTS
import {TextField, Grid, Typography, FormControlLabel, Checkbox,
    Button, Snackbar, Alert} from "@mui/material";

//CONTEXT
import StateContext from "../contexts/state-context";

//ESTILOS IMPORT
import {useImmerReducer} from "use-immer";
import {AddButton} from "../estilos/botones";


const listingTypeOptions = [
    { value: '', label: '' }, { value: 'Casa', label: 'Casa' },
    { value: 'Apartamento', label: 'Apartamento' }, { value: 'Oficina', label: 'Oficina' },
]

const propertyStatusOptions = [
    { value: '', label: '' }, { value: 'Venta', label: 'Venta' },
    { value: 'Renta', label: 'Renta' },
]

const rentalFrequencyOptions = [
    { value: '', label: '' }, { value: 'Dia', label: 'Dia' },
    { value: 'Semana', label: 'Semana' }, { value: 'Mes', label: 'Mes' },
]


function ListingUpdate(props) {

    const navigate = useNavigate();
    const GlobalState = useContext(StateContext)

    const initialState = {
        titleValue: props.listingData.title,
        listingTypeValue: props.listingData.listing_type,
        descriptionValue: props.listingData.description,
        propertyStatusValue: props.listingData.property_status,
        priceValue: props.listingData.price,
        rentalFrequencyValue: props.listingData.rental_frequency,
        roomsValue: props.listingData.rooms,
        furnishedValue: props.listingData.furnished,
        poolValue: props.listingData.pool,
        elevatorValue: props.listingData.elevator,
        cctvValue: props.listingData.cctv,
        parkingValue: props.listingData.parking,

        sendRequest: 0,

        openSnack: false,
        disableBtn: false,
    }

    function ReducerFuction(draft, action) {
        switch (action.type) {
            case 'catchTituloChange':
                draft.titleValue = action.tituloChosen;
                break;
            case 'catchListingTypeChange':
                draft.listingTypeValue = action.listingTypeChosen;
                break;
            case 'catchDescriptionChange':
                draft.descriptionValue = action.descriptionChosen;
                break;

            case 'catchPropertyStatusChange':
                draft.propertyStatusValue = action.propertyStatusChosen;
                break;
            case 'catchPriceChange':
                draft.priceValue = action.priceChosen;
                break;
            case 'catchRentalFrequencyChange':
                draft.rentalFrequencyValue = action.rentalFrequencyChosen;
                break;
            case 'catchRoomsChange':
                draft.roomsValue = action.roomsChosen;
                break;
            case 'catchFurnishedChange':
                draft.furnishedValue = action.furnishedChosen;
                break;
            case 'catchPoolChange':
                draft.poolValue = action.poolChosen;
                break;
            case 'catchElevatorChange':
                draft.elevatorValue = action.elevatorChosen;
                break;
            case 'catchCctvChange':
                draft.cctvValue = action.cctvChosen;
                break;
            case 'catchParkingChange':
                draft.parkingValue = action.parkingChosen;
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

        }
    }

    const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);


    //===ENVIAR EL FORMULARIO===
    function FormSubmit(e) {
        e.preventDefault();
           console.log('el registro a sido mandado')
        dispatch({type: 'changeSendRequest'});
        dispatch({type: 'disableTheBtn'});
    }

    useEffect(() => {
        if (state.sendRequest){
            async function UpdateProperty() {
                const formData = new FormData()
                formData.append('title', state.titleValue);
                formData.append('description', state.descriptionValue);
                formData.append('listing_type', state.listingTypeValue);
                formData.append('property_status', state.propertyStatusValue);
                formData.append('price', state.priceValue);
                formData.append('rental_frequency', state.rentalFrequencyValue);
                {state.listingTypeValue === 'Oficina' ? (
                    formData.append('rooms', 0)
                ):(
                    formData.append('rooms', state.roomsValue)
                )}
                formData.append('furnished', state.furnishedValue);
                formData.append('pool', state.poolValue);
                formData.append('elevator', state.elevatorValue);
                formData.append('cctv', state.cctvValue);
                formData.append('parking', state.parkingValue);
                formData.append('seller', GlobalState.userId);

                try {
                    const response = await Axios.patch(
                        `http://localhost:8000/api/listings/${props.listingData.id}/update/`, formData);
                    console.log(response.data)
                    dispatch({type:'openTheSnack'});
                }catch (e) {
                    dispatch({type: 'allowTheBtn'});
                    console.log(e.response);
                }
            }
            UpdateProperty()
        }
    }, [state.sendRequest])
    ///...ENVIAR EL FORMULARIO...

    function PriceDisplay(){
        if (state.propertyStatusValue === 'Renta' && state.rentalFrequencyValue === 'Dia'){
            return 'Precio por Dia*';
        }else if (state.propertyStatusValue === 'Renta' && state.rentalFrequencyValue === 'Semana'){
            return 'Precio por Semana*';
        }else if (state.propertyStatusValue === 'Renta' && state.rentalFrequencyValue === 'Mes'){
            return 'Precio por Mes*';
        }else {
            return 'Precio*';
        }
    }

    useEffect(() => {
        if (state.openSnack){
            setTimeout(() => {
                navigate(0);
            }, 2000)
        }
    }, [state.openSnack]);

    return (
        <>
            <div className={'formContainer'}>
                <form onSubmit={FormSubmit}>
                    <Grid item container justifyContent={'center'}>
                        <Typography variant={'h4'}>ACTUALIZAR UNA PROPIEDAD</Typography>
                    </Grid>
                    <Grid item container style={{marginTop: '1rem'}}>
                        <TextField
                            id="titulo"
                            label="Titulo*"
                            variant="standard"
                            fullWidth
                            value={state.titleValue}
                            onChange={(e) =>
                                dispatch({type: 'catchTituloChange', tituloChosen: e.target.value,})}
                        />
                    </Grid>

                    <Grid item container justifyContent={'space-between'}>
                        <Grid item xs={5} style={{marginTop: '1rem'}}>
                            <TextField
                                id="listingType"
                                label="Tipo de Propiedad*"
                                variant="standard"
                                fullWidth
                                value={state.listingTypeValue}
                                onChange={(e) =>
                                    dispatch({
                                        type: 'catchListingTypeChange',
                                        listingTypeChosen: e.target.value,})}
                                SelectProps={{native: true}}
                                select >
                                {listingTypeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={5} style={{marginTop: '1rem'}}>
                            <TextField
                                id="propertyStatus"
                                label="Estado de la Propiedad*"
                                variant="standard"
                                fullWidth
                                value={state.propertyStatusValue}
                                onChange={(e) =>
                                    dispatch({
                                        type: 'catchPropertyStatusChange',
                                        propertyStatusChosen : e.target.value,})}
                                SelectProps={{native: true}}
                                select >
                                {propertyStatusOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>

                    <Grid item container justifyContent={'space-between'}>
                        <Grid item xs={5} style={{marginTop: '1rem'}}>
                            <TextField
                                id="rentalFrequency" label="Frecuencia de renta"
                                variant="standard" fullWidth
                                disabled={state.propertyStatusValue === 'Venta'}
                                value={state.rentalFrequencyValue}
                                onChange={(e) =>
                                    dispatch({
                                        type: 'catchRentalFrequencyChange',
                                        rentalFrequencyChosen : e.target.value,})}
                                SelectProps={{native: true}}
                                select >
                                {rentalFrequencyOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={5} style={{marginTop: '1rem'}}>
                            <TextField
                                id="price" label={PriceDisplay()}
                                variant="standard" fullWidth
                                type={'number'}
                                value={state.priceValue}
                                onChange={(e) =>
                                    dispatch({
                                        type: 'catchPriceChange',
                                        priceChosen : e.target.value,})}
                            />
                        </Grid>
                    </Grid>

                    <Grid item container style={{marginTop: '1rem'}}>
                        <TextField
                            id="description" label="Descripcion" variant="outlined"
                            multiline rows={6} fullWidth
                            value={state.descriptionValue}
                            onChange={(e) =>
                                dispatch({
                                    type: 'catchDescriptionChange',
                                    descriptionChosen : e.target.value,})}
                        />
                    </Grid>

                    {state.listingTypeValue === 'Oficina' ? '' :
                        (<Grid item container xs={3} style={{marginTop: '1rem'}}>
                            <TextField
                                id="rooms" label="Habitaciones"
                                variant="standard" fullWidth
                                type={'number'}
                                value={state.roomsValue}
                                onChange={(e) =>
                                    dispatch({
                                        type: 'catchRoomsChange',
                                        roomsChosen : e.target.value,})}
                            />
                        </Grid>)
                    }

                    <Grid item container justifyContent={'space-between'}>
                        <Grid item style={{marginTop: '1rem'}}>
                            <FormControlLabel
                                control={<Checkbox
                                    checked={state.furnishedValue}
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'catchFurnishedChange',
                                            furnishedChosen : e.target.checked,})}
                                />}
                                label="Amueblada"
                            />
                        </Grid>

                        <Grid item style={{marginTop: '1rem'}}>
                            <FormControlLabel
                                label="Piscina"
                                control={ <Checkbox
                                    checked={state.poolValue}
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'catchPoolChange',
                                            poolChosen : e.target.checked,})}
                                />}
                            />
                        </Grid>

                        <Grid item style={{marginTop: '1rem'}}>
                            <FormControlLabel
                                label="Elevador"
                                control={ <Checkbox
                                    checked={state.elevatorValue}
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'catchElevatorChange',
                                            elevatorChosen : e.target.checked,})}
                                />}
                            />
                        </Grid>

                        <Grid item style={{marginTop: '1rem'}}>
                            <FormControlLabel
                                label="Cctv"
                                control={ <Checkbox
                                    checked={state.cctvValue}
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'catchCctvChange',
                                            cctvChosen : e.target.checked,})}
                                />}
                            />
                        </Grid>

                        <Grid item style={{marginTop: '1rem'}}>
                            <FormControlLabel
                                label="Parqueo"
                                control={ <Checkbox
                                    checked={state.parkingValue}
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'catchParkingChange',
                                            parkingChosen : e.target.checked,})}
                                />}
                            />
                        </Grid>
                    </Grid>

                    <Grid item container xs={8} style={{marginTop: '1rem', marginLeft: 'auto', marginRight: 'auto'}}>
                        <AddButton variant={'contained'} fullWidth type={'submit'} disabled={state.disableBtn}>
                            ACTUALIZAR PROPIEDAD
                        </AddButton>
                    </Grid>

                </form>
                <Button variant={'contained'} onClick={props.closeDialog}>
                    CANCELAR
                </Button>

                <Snackbar
                    open={state.openSnack}
                    anchorOrigin={{
                        vertical:'bottom',
                        horizontal:'center'
                    }}>
                    <Alert severity="success" >
                        Se ha actualizado correctamente esta propiedad!
                    </Alert>
                </Snackbar>
            </div>
        </>
    )
}

export default ListingUpdate;
