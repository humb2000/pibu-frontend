import React, {useEffect, useRef, useMemo, useContext} from 'react';
import {useNavigate} from "react-router-dom";
import Axios from "axios";

//REACT LEAFLET IMPORTS
import { MapContainer, TileLayer, useMap, Marker} from 'react-leaflet'
import {Icon} from "leaflet/dist/leaflet-src.esm";

//MUI IMPORTS
import {TextField, Grid, Typography, FormControlLabel, Checkbox, Snackbar, Alert} from "@mui/material";

//CONTEXT
import StateContext from "../../contexts/state-context";

//ESTILOS IMPORT
import './add-propiedad.css'
import icon from '../../activos/Mapicons/position.png'
import {useImmerReducer} from "use-immer";
import {AddButton, PictureButton} from "../../estilos/botones";



const boroughOptions = [
    { value: '', label: '' },{ value: 'Camagüey', label: 'Camagüey' },
    { value: 'Florida', label: 'Florida' },{ value: 'Guáimaro', label: 'Guáimaro' },
    { value: 'Vertientes', label: 'Vertientes' },{ value: 'Santa Cruz del Sur', label: 'Santa Cruz del Sur' },
    { value: 'Nuevitas', label: 'Nuevitas' },{ value: 'Minas', label: 'Minas' },
    { value: 'Sibanicú', label: 'Sibanicú' },{ value: 'Esmeralda', label: 'Esmeralda' },
    { value: 'Carlos Manuel de Céspedes', label: 'Carlos Manuel de Céspedes' },
    { value: 'Jimaguayú', label: 'Jimaguayú' },{ value: 'Sierra de Cubitas', label: 'Sierra de Cubitas' },
    { value: 'Najasa', label: 'Najasa' }
]

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


function AddPropiedad() {
    const navigate = useNavigate();
    const GlobalState = useContext(StateContext)

    const initialState = {
        titleValue: '',
        listingTypeValue: '',
        descriptionValue: '',
        boroughValue: '',
        latitudeValue: '',
        longitudeValue: '',
        propertyStatusValue: '',
        priceValue: '',
        rentalFrequencyValue: '',
        roomsValue: '',
        furnishedValue: false,
        poolValue: false,
        elevatorValue: false,
        cctvValue: false,
        parkingValue: false,
        picture1Value: '',
        picture2Value: '',
        picture3Value: '',
        picture4Value: '',
        picture5Value: '',
        mapInstance: null,
        markerPosition: {
            lat: '21.37536564291155',
            lng: '-77.9153941045292',
        },
        uploadedPictures: [],
        sendRequest: 0,
        userProfile: {
            agencyName: '',
            phoneNumber: '',
        },
        openSnack: false,
        disableBtn: false,

        titleErrors: {
            hasErrors: false,
            errorMessage: '',
        },
        listingTypeErrors: {
            hasErrors: false,
            errorMessage: '',
        },
        propertyStatusErrors: {
            hasErrors: false,
            errorMessage: '',
        },
        priceErrors: {
            hasErrors: false,
            errorMessage: '',
        },
        roomsErrors: {
            hasErrors: false,
            errorMessage: '',
        },
        boroughErrors: {
            hasErrors: false,
            errorMessage: '',
        },

    }

    function ReducerFunction(draft, action) {
        switch (action.type) {
            case 'catchTituloChange':
                draft.titleValue = action.tituloChosen;
                draft.titleErrors.hasErrors = false;
                draft.titleErrors.errorMessage = '';
                break;
            case 'catchListingTypeChange':
                draft.listingTypeValue = action.listingTypeChosen;
                draft.listingTypeErrors.hasErrors = false;
                draft.listingTypeErrors.errorMessage = '';
                break;
            case 'catchDescriptionChange':
                draft.descriptionValue = action.descriptionChosen;
                break;
            case 'catchBoroughChange':
                draft.boroughValue = action.boroughChosen;
                draft.boroughErrors.hasErrors = false;
                draft.boroughErrors.errorMessage = '';
                break;
            case 'catchLatitudeChange':
                draft.latitudeValue = action.latitudeChosen;
                break;
            case 'catchLongitudeChange':
                draft.longitudeValue = action.longitudeChosen;
                break;
            case 'catchPropertyStatusChange':
                draft.propertyStatusValue = action.propertyStatusChosen;
                draft.propertyStatusErrors.hasErrors = false;
                draft.propertyStatusErrors.errorMessage = '';
                break;
            case 'catchPriceChange':
                draft.priceValue = action.priceChosen;
                draft.priceErrors.hasErrors = false;
                draft.priceErrors.errorMessage = '';
                break;
            case 'catchRentalFrequencyChange':
                draft.rentalFrequencyValue = action.rentalFrequencyChosen;
                break;
            case 'catchRoomsChange':
                draft.roomsValue = action.roomsChosen;
                draft.roomsErrors.hasErrors = false;
                draft.roomsErrors.errorMessage = '';
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
            case 'catchPicture1Change':
                draft.picture1Value = action.picture1Chosen;
                break;
            case 'catchPicture2Change':
                draft.picture2Value = action.picture2Chosen;
                break;
            case 'catchPicture3Change':
                draft.picture3Value = action.picture3Chosen;
                break;
            case 'catchPicture4Change':
                draft.picture4Value = action.picture4Chosen;
                break;
            case 'catchPicture5Change':
                draft.picture5Value = action.picture5Chosen;
                break;

            case 'getMap':
                draft.mapInstance = action.mapData;
                break;
            case 'changeMarkerPosition':
                draft.markerPosition.lat = action.changeLatitude;
                draft.markerPosition.lng = action.changeLongitude;
                draft.latitudeValue = '';
                draft.longitudeValue = '';
                break;
            case 'catchUploadedPicture':
                draft.uploadedPictures = action.picturesChosen;
                break;

            case 'changeSendRequest':
                draft.sendRequest = draft.sendRequest + 1;
                break;
            case 'changeUserProfileInfo':
                draft.userProfile.agencyName = action.profileObject.agency_name;
                draft.userProfile.phoneNumber = action.profileObject.phone_number;
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
            case 'catchTitleErrors':
                if (action.tituloChosen.length === 0){
                    draft.titleErrors.hasErrors = true;
                    draft.titleErrors.errorMessage = 'Este campo no puede estar vacio.';
                }
                break;
            case 'catchListingTypeErrors':
                if (action.listingTypeChosen.length === 0){
                    draft.listingTypeErrors.hasErrors = true;
                    draft.listingTypeErrors.errorMessage = 'Este campo no puede estar vacio.';
                }
                break;
            case 'catchPropertyStatusErrors':
                if (action.propertyStatusChosen.length === 0){
                    draft.propertyStatusErrors.hasErrors = true;
                    draft.propertyStatusErrors.errorMessage = 'Este campo no puede estar vacio.';
                }
                break;
            case 'catchPriceErrors':
                if (action.priceChosen.length === 0){
                    draft.priceErrors.hasErrors = true;
                    draft.priceErrors.errorMessage = 'Este campo no puede estar vacio.';
                } else if(parseFloat(action.priceChosen) < 0){
                    draft.priceErrors.hasErrors = true;
                    draft.priceErrors.errorMessage = 'Este campo no puede ser un numero negativo.';
                }
                break;
            case 'catchRoomsErrors':
                if (parseFloat(action.roomsChosen) < 0){
                    draft.roomsErrors.hasErrors = true;
                    draft.roomsErrors.errorMessage = 'Este campo no puede ser un numero negativo.';
                }
                break;
            case 'catchBoroughErrors':
                if (action.boroughChosen.length === 0){
                    draft.boroughErrors.hasErrors = true;
                    draft.boroughErrors.errorMessage = 'Este campo no puede estar vacio.';
                }
                break;
            case 'emptyTitle':
                draft.titleErrors.hasErrors = true;
                draft.titleErrors.errorMessage = 'Este campo no puede estar vacio.';
                break;
            case 'emptyListingType':
                    draft.listingTypeErrors.hasErrors = true;
                    draft.listingTypeErrors.errorMessage = 'Este campo no puede estar vacio.';
                break;
            case 'emptyPropertyStatus':
                    draft.propertyStatusErrors.hasErrors = true;
                    draft.propertyStatusErrors.errorMessage = 'Este campo no puede estar vacio.';
                break;
            case 'emptyPrice':
                    draft.priceErrors.hasErrors = true;
                    draft.priceErrors.errorMessage = 'Este campo no puede estar vacio.';
                break;
            case 'negativePrice':
                    draft.priceErrors.hasErrors = true;
                    draft.priceErrors.errorMessage = 'Este campo no puede ser un numero negativo.';
                break;
            case 'negativeRooms':
                    draft.roomsErrors.hasErrors = true;
                    draft.roomsErrors.errorMessage = 'Este campo no puede ser un numero negativo.';
                break;
            case 'emptyBorough':
                    draft.boroughErrors.hasErrors = true;
                    draft.boroughErrors.errorMessage = 'Este campo no puede estar vacio.';
                break;
        }
    }

    const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

    //===COSAS MAPA===
    const MyIcon = new Icon({
    iconUrl: icon,
    iconSize: [40, 40],
    });

    //===MARKER===
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                dispatch({type: 'catchLatitudeChange', latitudeChosen: marker.getLatLng().lat})
                dispatch({type: 'catchLongitudeChange', longitudeChosen: marker.getLatLng().lng})
            },
        }),
    [],);

    function TheMapComponent() {
        const map = useMap()
        dispatch({type: 'getMap', mapData: map});
    }
    //...COSAS MAPA...

//CAmbiar la vista del mapa dependiendo de la provincia marcada
    useEffect(() => {
        if (state.boroughValue === 'Camagüey'){
            dispatch({
                type: 'changeMarkerPosition',
                changeLatitude: '21.37536564291155',
                changeLongitude: '-77.92088726823285'})
            state.mapInstance.setView([21.37536564291155, -77.92088726823285], 12)
        }else if (state.boroughValue === 'Florida'){
            dispatch({
                type: 'changeMarkerPosition',
                changeLatitude: '21.527167257936995',
                changeLongitude: '-78.22672344964008'})
            state.mapInstance.setView([21.527167257936995, -78.22672344964008], 14)
        }else if (state.boroughValue === 'Guáimaro'){
            dispatch({
                type: 'changeMarkerPosition',
                changeLatitude: '21.05445038378962',
                changeLongitude: '-77.35268809493012'})
            state.mapInstance.setView([21.05445038378962, -77.35268809493012], 14)
        }else if (state.boroughValue === 'Vertientes'){
            dispatch({
                type: 'changeMarkerPosition',
                changeLatitude: '21.260566089556356',
                changeLongitude: '-78.14881063066824'})
            state.mapInstance.setView([21.260566089556356, -78.14881063066824], 14)
        }else if (state.boroughValue === 'Santa Cruz del Sur'){
            dispatch({
                type: 'changeMarkerPosition',
                changeLatitude: '20.71552193340916',
                changeLongitude: '-77.99680449996934'})
            state.mapInstance.setView([20.71552193340916, -77.99680449996934], 12)
        }else if (state.boroughValue === 'Nuevitas'){
            dispatch({
                type: 'changeMarkerPosition',
                changeLatitude: '21.547086849018182',
                changeLongitude: '-77.26595617845754'})
            state.mapInstance.setView([21.547086849018182, -77.26595617845754], 14)
        }else if (state.boroughValue === 'Minas'){
            dispatch({
                type: 'changeMarkerPosition',
                changeLatitude: '21.49063429954712',
                changeLongitude: '-77.6050732397586'})
            state.mapInstance.setView([21.49063429954712, -77.6050732397586], 14)
        }else if (state.boroughValue === 'Sibanicú'){
            dispatch({
                type: 'changeMarkerPosition',
                changeLatitude: '21.243807422695532',
                changeLongitude: '-77.52198914753303'})
            state.mapInstance.setView([21.243807422695532, -77.52198914753303], 14)
        }else if (state.boroughValue === 'Esmeralda'){
            dispatch({
                type: 'changeMarkerPosition',
                changeLatitude: '21.846706415835968',
                changeLongitude: '-78.11250424567453'})
            state.mapInstance.setView([21.846706415835968, -78.11250424567453], 14)
        }else if (state.boroughValue === 'Carlos Manuel de Céspedes'){
            dispatch({
                type: 'changeMarkerPosition',
                changeLatitude: '21.575903515286576',
                changeLongitude: '-78.28279232048746'})
            state.mapInstance.setView([21.575903515286576, -78.28279232048746], 14)
        }else if (state.boroughValue === 'Jimaguayú'){
            dispatch({
                type: 'changeMarkerPosition',
                changeLatitude: '21.24188744878855',
                changeLongitude: '-77.82823300373546'})
            state.mapInstance.setView([21.24188744878855, -77.82823300373546], 14)
        }else if (state.boroughValue === 'Sierra de Cubitas'){
            dispatch({
                type: 'changeMarkerPosition',
                changeLatitude: '21.709295370836504',
                changeLongitude: '-77.76368835565178'})
            state.mapInstance.setView([21.709295370836504, -77.76368835565178], 14)
        }else if (state.boroughValue === 'Najasa'){
            dispatch({
                type: 'changeMarkerPosition',
                changeLatitude: '21.072191618452777',
                changeLongitude: '-77.75064207835351'})
            state.mapInstance.setView([21.072191618452777, -77.75064207835351], 14)
        }
    }, [state.boroughValue])

    //===CAPTURA DE LAS FOTOS===
    useEffect(() => {
        if (state.uploadedPictures[0]){
            dispatch({type: 'catchPicture1Change',
                picture1Chosen: state.uploadedPictures[0]})
        }
    }, [state.uploadedPictures[0]])

    useEffect(() => {
        if (state.uploadedPictures[1]){
            dispatch({type: 'catchPicture2Change',
                picture2Chosen: state.uploadedPictures[1]})
        }
    }, [state.uploadedPictures[1]])

    useEffect(() => {
        if (state.uploadedPictures[2]){
            dispatch({type: 'catchPicture3Change',
                picture3Chosen: state.uploadedPictures[2]})
        }
    }, [state.uploadedPictures[2]])

    useEffect(() => {
        if (state.uploadedPictures[3]){
            dispatch({type: 'catchPicture4Change',
                picture4Chosen: state.uploadedPictures[3]})
        }
    }, [state.uploadedPictures[3]])

    useEffect(() => {
        if (state.uploadedPictures[4]){
            dispatch({type: 'catchPicture5Change',
                picture5Chosen: state.uploadedPictures[4]})
        }
    }, [state.uploadedPictures[4]])
    //...CAPTURA DE LAS FOTOS...

    //REQUES TO GET PROFILE INFO
    useEffect(() => {
        async function GetProfileInfo() {
            try {
                const response = await Axios.get(`http://localhost:8000/api/profiles/${GlobalState.userId}`);
                console.log(response.data)
                dispatch({type: 'changeUserProfileInfo', profileObject: response.data})
            }catch (e){
                console.log(e.response);
            }
        }
        GetProfileInfo();
    }, []);

    //===ENVIAR EL FORMULARIO===
    function FormSubmit(e) {
        e.preventDefault();
        if (!state.titleErrors.hasErrors &&
            !state.listingTypeErrors.hasErrors &&
            !state.propertyStatusErrors.hasErrors &&
            !state.priceErrors.hasErrors &&
            !state.roomsErrors.hasErrors &&
            !state.boroughErrors.hasErrors &&
            state.latitudeValue &&
            state.longitudeValue
        ) {
            dispatch({type: 'changeSendRequest'});
            dispatch({type: 'disableTheBtn'})
        } else if (state.titleValue === ''){
            dispatch({type: 'emptyTitle'})
            window.scrollTo(0, 0);
        } else if (state.listingTypeValue === ''){
            dispatch({type: 'emptyListingType'})
            window.scrollTo(0, 0);
        } else if (state.propertyStatusValue === ''){
            dispatch({type: 'emptyPropertyStatus'})
            window.scrollTo(0, 0);
        } else if (state.priceValue === ''){
            dispatch({type: 'emptyPrice'})
            window.scrollTo(0, 0);
        } else if (parseFloat(state.priceValue) < 0){
            dispatch({type: 'negativePrice'})
            window.scrollTo(0, 0);
        } else if (parseFloat(state.roomsValue) < 0){
            dispatch({type: 'negativeRooms'})
            window.scrollTo(0, 500);
        } else if (state.boroughValue === ''){
            dispatch({type: 'emptyBorough'})
            window.scrollTo(0, 500);
        }
    }

    useEffect(() => {
        if (state.sendRequest){
            async function AddProperty() {
                const formData = new FormData()
                formData.append('title', state.titleValue);
                formData.append('description', state.descriptionValue);
                formData.append('borough', state.boroughValue);
                formData.append('listing_type', state.listingTypeValue);
                formData.append('property_status', state.propertyStatusValue);
                formData.append('price', state.priceValue);
                formData.append('rental_frequency', state.rentalFrequencyValue);
                formData.append('rooms', state.roomsValue);
                formData.append('furnished', state.furnishedValue);
                formData.append('pool', state.poolValue);
                formData.append('elevator', state.elevatorValue);
                formData.append('cctv', state.cctvValue);
                formData.append('parking', state.parkingValue);
                formData.append('latitude', state.latitudeValue);
                formData.append('longitude', state.longitudeValue);
                formData.append('picture1', state.picture1Value);
                formData.append('picture2', state.picture2Value);
                formData.append('picture3', state.picture3Value);
                formData.append('picture4', state.picture4Value);
                formData.append('picture5', state.picture5Value);
                formData.append('seller', GlobalState.userId);
                try {
                    const response = await Axios.post('http://localhost:8000/api/listings/create/', formData)
                    console.log(response.data)
                    dispatch({type:'openTheSnack'});
                }catch (e) {
                    dispatch({type: 'allowTheBtn'});
                    console.log(e.response);
                }
            }
            AddProperty()
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

    function SubmitButtonDisplay(){
        if (GlobalState.userIsLogged &&
            state.userProfile.agencyName !== null &&
            state.userProfile.agencyName !== '' &&
            state.userProfile.phoneNumber !== null &&
            state.userProfile.phoneNumber !== ''
        ) {
            return(
                <AddButton variant={'contained'} fullWidth type={'submit'} disabled={state.disableBtn}>
                    AGREGAR
                </AddButton>
            );
        } else if (GlobalState.userIsLogged && (
            state.userProfile.agencyName === null ||
            state.userProfile.agencyName === '' ||
            state.userProfile.phoneNumber === null ||
            state.userProfile.phoneNumber === ''
        )) {
            return (
                <AddButton variant={'outlined'} fullWidth
                    onClick={() => navigate('/perfil')}>
                    COMPLETA TU PERFIL PARA AGREGAR UNA PROPIEDAD
                </AddButton>
            );
        } else if (!GlobalState.userIsLogged){
            return (
                <AddButton variant={'outlined'} fullWidth
                           onClick={() => navigate('/acceder')}>
                    INICIA SESION PARA AGREGAR UNA PROPIEDAD
                </AddButton>
            )
        }
    }

    useEffect(() => {
        if (state.openSnack){
            setTimeout(() => {
                navigate('/listados');
            }, 2000)
        }
    }, [state.openSnack]);

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
                            label="Titulo*"
                            variant="standard"
                            fullWidth
                            value={state.titleValue}
                            onChange={(e) =>
                                dispatch({type: 'catchTituloChange',
                                    tituloChosen: e.target.value,})}
                            onBlur={(e) =>
                                dispatch({type: 'catchTitleErrors',
                                    tituloChosen: e.target.value,})}
                            error={state.titleErrors.hasErrors}
                            helperText={state.titleErrors.errorMessage}
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
                                    dispatch({type: 'catchListingTypeChange',
                                        listingTypeChosen: e.target.value,}
                                    )}
                                onBlur={(e) =>
                                    dispatch({type: 'catchListingTypeErrors',
                                        listingTypeChosen: e.target.value,}
                                    )}
                                error={state.listingTypeErrors.hasErrors}
                                helperText={state.listingTypeErrors.errorMessage}

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
                                        propertyStatusChosen : e.target.value,}
                                    )}
                                onBlur={(e) =>
                                    dispatch({
                                        type: 'catchPropertyStatusErrors',
                                        propertyStatusChosen : e.target.value,}
                                    )}
                                error={state.propertyStatusErrors.hasErrors}
                                helperText={state.propertyStatusErrors.errorMessage}

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
                                onBlur={(e) =>
                                    dispatch({
                                        type: 'catchPriceErrors',
                                        priceChosen : e.target.value,})}
                                error={state.priceErrors.hasErrors}
                                helperText={state.priceErrors.errorMessage}

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
                                onBlur={(e) =>
                                    dispatch({
                                        type: 'catchRoomsErrors',
                                        roomsChosen : e.target.value,})}
                                error={state.roomsErrors.hasErrors}
                                helperText={state.roomsErrors.errorMessage}

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

                    <Grid item xs={5} style={{marginTop: '1rem'}}>
                        <TextField
                            id="borough"
                            label="Municipio*"
                            variant="standard"
                            fullWidth
                            value={state.boroughValue}
                            onChange={(e) =>
                                dispatch({
                                    type: 'catchBoroughChange',
                                    boroughChosen : e.target.value,}
                                )}
                            onBlur={(e) =>
                                dispatch({
                                    type: 'catchBoroughErrors',
                                    boroughChosen : e.target.value,}
                                )}
                            error={state.boroughErrors.hasErrors}
                            helperText={state.boroughErrors.errorMessage}

                            SelectProps={{native: true}}
                            select >
                            {boroughOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                    </Grid>

                    {/*===MAPA===*/}
                    <Grid item style={{marginTop: '1rem'}}>
                        {state.longitudeValue && state.latitudeValue ? (
                            <Alert severity={'success'}>
                                Su propiedad esta localizada a {state.latitudeValue},{' '}
                                {state.longitudeValue}
                            </Alert>
                        ):(
                            <Alert severity={'warning'}>
                                Localice su propiedad en el mapa antes de agregarla.
                            </Alert>
                        )}

                    </Grid>

                    <Grid item container style={{height: '35rem', marginTop: '1rem'}}>
                        <MapContainer center={[21.37536564291155, -77.9153941045292]}
                                      zoom={9.4}
                                      scrollWheelZoom={true}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <TheMapComponent />
                            <Marker
                                draggable
                                eventHandlers={eventHandlers}
                                position={state.markerPosition}
                                ref={markerRef}
                                icon={MyIcon}
                            >
                            </Marker>
                        </MapContainer>
                    </Grid>
                    {/*...MAPA...*/}

                    <Grid item container xs={6} style={{marginTop: '1rem', marginLeft: 'auto', marginRight: 'auto'}}>
                        <PictureButton
                            variant={'contained'} fullWidth component={'label'}>Agregar Imagenes (Max: 5)
                            <input type={'file'} multiple accept={'image/png, image/gif, image/jpeg'} hidden
                            onChange={(e) =>
                                dispatch({
                                    type: 'catchUploadedPicture',
                                    picturesChosen : e.target.files,})}/>
                        </PictureButton>
                    </Grid>

                    <Grid item container>
                        <ul>
                            {state.picture1Value ? <li>{state.picture1Value.name}</li> : ''}
                            {state.picture2Value ? <li>{state.picture2Value.name}</li> : ''}
                            {state.picture3Value ? <li>{state.picture3Value.name}</li> : ''}
                            {state.picture4Value ? <li>{state.picture4Value.name}</li> : ''}
                            {state.picture5Value ? <li>{state.picture5Value.name}</li> : ''}
                        </ul>
                    </Grid>

                    <Grid item container xs={8} style={{marginTop: '1rem', marginLeft: 'auto', marginRight: 'auto'}}>
                        {SubmitButtonDisplay()}
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
                        Se ha agregado la propiedad correctamente!
                    </Alert>
                </Snackbar>
            </div>
        </>
    )
}

export default AddPropiedad;
