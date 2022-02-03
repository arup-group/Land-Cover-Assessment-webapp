import React, { useState } from "react";
import ReactDOMServer from 'react-dom/server';
import { MapContainer, GeoJSON, useMap  } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import BaseMaps from './BaseMaps'

export default function Map(props) {
    const [center, setCenter] = useState([51.505, -0.09])

    const MoveMap = () => {
        const map = useMap()

        if (props.geojson){
            var maxlat = props.geojson.features[0].geometry.bbox[3]
            var maxlon = props.geojson.features[0].geometry.bbox[2]
            var minlat = props.geojson.features[0].geometry.bbox[1]
            var minlon = props.geojson.features[0].geometry.bbox[0]
            for (const fid in props.geojson.features){
                minlat = minlat < props.geojson.features[fid].geometry.bbox[1] ? props.geojson.features[fid].geometry.bbox[1] : minlat
                minlon = minlon < props.geojson.features[fid].geometry.bbox[0] ? props.geojson.features[fid].geometry.bbox[0] : minlon
                maxlat = maxlat > props.geojson.features[fid].geometry.bbox[3] ? props.geojson.features[fid].geometry.bbox[3] : maxlat
                maxlon = maxlon > props.geojson.features[fid].geometry.bbox[2] ? props.geojson.features[fid].geometry.bbox[2] : maxlon
                
                // bbox:
                //lon += (props.geojson.features[fid].geometry.bbox[0]+((props.geojson.features[fid].geometry.bbox[2]-props.geojson.features[fid].geometry.bbox[0])/2))
                //lat += (props.geojson.features[fid].geometry.bbox[1]+((props.geojson.features[fid].geometry.bbox[3]-props.geojson.features[fid].geometry.bbox[1])/2))
            }

            map.flyToBounds([[minlat, minlon],[maxlat, maxlon]])
        }
        return null
    }

    const Popup = ({ feat }) => {
        // var popupContent = <></>
        // for (const [key, value] of Object.entries(feat.properties)) {
        //     popupContent += <p><b>{key}:</b> {value}</p>;
        // }
        // return popupContent
        return <p>{JSON.stringify(feat.properties)}</p>
      };

    const EachAsset = (feat, layer) => {
        const popupContent = ReactDOMServer.renderToString(<Popup feat={feat} />);
        layer.bindTooltip(popupContent, {permanent: false})
    }
  

    console.log(props.geojson)
    return(
    <MapContainer key={1} center={center} style={{ height: "100vh", innerWidth: "100vh"}} zoom={13} >
        {props.geojson && (<GeoJSON key={props.geojson} data={props.geojson} pathOptions={{ color: 'red' }} onEachFeature={EachAsset}/>)}
        <MoveMap/>
        <BaseMaps />
    </MapContainer>
    )
}