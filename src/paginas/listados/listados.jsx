import React, {useState} from 'react';

//REACT LEAFLET IMPORTS
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import {Icon} from "leaflet/dist/leaflet-src.esm";

//ESTILOS IMPORTS
import 'leaflet/dist/leaflet.css'
import {CardStyle, CardMediaImagenStyle} from "../../estilos/card";

//MUI IMPORTS
import {Grid, AppBar, Typography, Button, Card, CardHeader, CardMedia, CardContent} from "@mui/material";

//MAPS ICONS IMPORTS
import houseIconPng from '../../activos/Mapicons/house.png';
import apartmentIconPng from '../../activos/Mapicons/apartment.png';
import officeIconPng from '../../activos/Mapicons/office.png';
//ACIVOS IMPORTS
import img1 from '../../activos/img1.jpg';
import miListado from '../../activos/Data/Dummydata'

const center = [21.376324723140478, -77.91409596471246];

function Listados() {
    const houseIcon = new Icon({
        iconUrl: houseIconPng,
        iconSize: [40, 40],
    });
    const apartmentIcon = new Icon({
        iconUrl: apartmentIconPng,
        iconSize: [40, 40],
    });
    const officeIcon = new Icon({
        iconUrl: officeIconPng,
        iconSize: [40, 40],
    });

    const [latitud, setLatitud] = useState(21.377017108458062)
    const [longitud, setLongitud] = useState(-77.91425145168371)

    function VeEste() {
        setLatitud(21.37340542068839);
        setLongitud(-77.90499246654599);
    }
    function VeCentro() {
            setLatitud(21.377017108458062);
            setLongitud(-77.91425145168371);
        }

    return (
        <Grid container>
            <Grid item xs={4}>
                {miListado.map((listing) => {
                    return(
                        <CardStyle key={listing.id}>
                          <CardHeader
                            // action={
                            //   <IconButton aria-label="settings">
                            //     <MoreVertIcon />
                            //   </IconButton>
                            // }
                            title={listing.title}
                          />
                          <CardMediaImagenStyle
                            component="img"
                            image={listing.picture1}
                            alt={listing.title}
                          />
                          <CardContent>
                            <Typography variant="body2" >
                                {listing.description.substring(0, 200)}...
                            </Typography>
                          </CardContent>
                          {/*<CardActions disableSpacing>*/}
                          {/*  <IconButton aria-label="add to favorites">*/}
                          {/*    <FavoriteIcon />*/}
                          {/*  </IconButton>*/}
                          {/*  <IconButton aria-label="share">*/}
                          {/*    <ShareIcon />*/}
                          {/*  </IconButton>*/}
                          {/*</CardActions>*/}
                        </CardStyle>
                    );
                })}
            </Grid>
            <Grid item xs={8} style={{marginTop: '0.5rem'}}>
                <AppBar position={'sticky'}>
                    <div>
                        <MapContainer center={center}
                                      zoom={17}
                                      style={{width: '100vw', height: '100vh'}}
                                      scrollWheelZoom={true}>
                            <TileLayer
                                url={'https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=5slgzrA6fvk9w4nOG05e'}
                                attribution={'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'}
                            />

                            {miListado.map((listing) => {
                                function inconDisplay(){
                                    if(listing.listing_type === 'House'){
                                        return houseIcon
                                    }
                                    else if (listing.listing_type === 'Apartment'){
                                        return apartmentIcon
                                    }
                                    else if (listing.listing_type === 'Office'){
                                        return officeIcon
                                    }
                                }
                                    return (
                                        <Marker
                                            key={listing.id}
                                            icon={inconDisplay()}
                                            position={[
                                                listing.location.coordinates[0],
                                                listing.location.coordinates[1]
                                            ]}
                                        >
                                            <Popup>
                                                <Typography variant={'h5'}>{listing.title}</Typography>
                                                <img
                                                    src={listing.picture1}
                                                    style={{ height: '14rem', width: '18rem' }}
                                                />
                                                <Typography variant={'body1'}>
                                                    {listing.description.substring(0, 150)}...
                                                </Typography>
                                                <Button variant={'contained'} fullWidth>Detalles</Button>
                                            </Popup>

                                        </Marker>
                                    );
                                })}

                            {/*<Marker*/}
                            {/*    icon={houseIcon}*/}
                            {/*    position={[latitud, longitud]}*/}
                            {/*>*/}
                            {/*    <Popup>*/}
                            {/*        <Typography variant={'h5'}>Un Titulo</Typography>*/}
                            {/*        <img src={img1} style={{ height: '14rem', width: '18rem' }}/>*/}
                            {/*        <Typography variant={'body1'}>este es algun texto debajo del titulo</Typography>*/}
                            {/*        <Button variant={'contained'} fullWidth>Un Link</Button>*/}
                            {/*    </Popup>*/}
                            {/*</Marker>*/}
                        </MapContainer>
                    </div>
                </AppBar>
            </Grid>
        </Grid>
    );
}

export default Listados;