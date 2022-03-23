import React from "react";
import ExportCSV from "./ExportCSV"

export default function PostGEOJSON(geojson, csv, APIlist, nfmDD,csvDD,shpDD, setGeojson, setShowModal) {

    const postreq = async (url, body) => {

        const settings = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(body)
        };
        try {
            const fetchResponse = await fetch(url, settings);
            const data = await fetchResponse.json();
            setGeojson(data)
            ExportCSV(geojson)
            setShowModal(false)
            return data;
        } catch (e) {
            return e;
        }    

    }

    if ((geojson!=null) & (APIlist!=null) & (csv!=null)) {
        const url = "https://cors-anywhere.herokuapp.com//http://127.0.0.1:2000/LUC"
        const body = {
            "study_area_geojson": geojson,
            "nfm_oid": csv.content,
            "col": {"NFM": nfmDD, "OIDcsv":csvDD, "OIDshp":shpDD},
            "api_list": APIlist
        }
        postreq(url, body)
    } else if ((geojson!=null) & (APIlist!=null))  {
        const url = "http://127.0.0.1:2000/LU"
        const body = {
            "study_area_geojson": geojson,
            "api_list": APIlist
        }
        postreq(url, body)
    }
    else {
        return null
    }
    return null
  
}

//                authorization: 'Bearer 123abc456def',
