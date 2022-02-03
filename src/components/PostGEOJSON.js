import React from "react";

export default function PostGEOJSON(props) {

    if (props.geojson) {
        post(props.geojson)
    } else {
        return null
    }

    const post = async (GeoJSON) => {
        const url = "http://localhost:9000/api/sensors/"

        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: 'Bearer 123abc456def',
            },
            body: GeoJSON
        };
        try {
            const fetchResponse = await fetch(url, settings);
            const data = await fetchResponse.json();
            props.setGeojson(data)
            return data;
        } catch (e) {
            return e;
        }    

    }
}