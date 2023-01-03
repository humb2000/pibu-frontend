import React from 'react';

//REACT LEAFLET
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import 'leaflet/dist/leaflet.css'

//Mui
import {Grid, AppBar} from "@mui/material";

const center = [21.376324723140478, -77.91409596471246];

function Listados() {
    return (
        <Grid container>
            <Grid item xs={4}>espacio blanco</Grid>
            <Grid item xs={8}>
                <AppBar position={'sticky'}>
                    <div>
                        <MapContainer center={center}
                                      zoom={17}
                                      style={{width: '100vw', height: '100vh'}}
                                      scrollWheelZoom={false}>
                            <TileLayer
                                url={'https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=5slgzrA6fvk9w4nOG05e'}
                                attribution={'<a href="https://www.maptiler.com/copyright/" ' +
                                    'target="_blank">&copy;' +
                                    ' MapTiler</a> <a href="https://www.openstreetmap.org/copyright" ' +
                                    'target="_blank">&copy; OpenStreetMap contributors</a>'}
                            />
                        </MapContainer>
                    </div>
                </AppBar>
            </Grid>
        </Grid>
    );
}

export default Listados;