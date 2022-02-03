import React from 'react';
import { LayersControl, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


function BaseMaps () {
    return(
        <LayersControl position="topright">
            <LayersControl.BaseLayer checked name = "OSM Mapnik">
                <TileLayer 
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name = "OSM GreyScale">
                <TileLayer
                    url='https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png' 
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
            </LayersControl.BaseLayer>
        </LayersControl>
    )
}

export default BaseMaps