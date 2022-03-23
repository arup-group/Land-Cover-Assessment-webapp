import React from "react";
import { CSVDownload, CSVLink } from "react-csv";
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';

// TODO call the NFM API with geojson

export default function ExportCSV(geojson) {

  var fileHeaders =  []
  var fileData = []

  const addHeader = (headers, newHeader) => {
    const found = headers.some(el => el.key === newHeader);
    if (!found) headers.push({label: newHeader, key:newHeader});
    return headers;
  }

    if (geojson){
      for (const [FID, feat] of Object.entries(geojson.features)) {
        const properties = {}
        for (const [header, value] of Object.entries(feat.properties)){
          fileHeaders = addHeader(fileHeaders, header)
          properties[header] = value
        }
        fileData.push(properties)
      }

      return(
        <CSVDownload
          headers={fileHeaders}
          data={fileData}
          fileName="results.csv"
          target="_blank"
        >
          Export
        </CSVDownload>
      )
    } else return null
}

