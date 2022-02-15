import React, {useState} from "react";
//import shp from "shpjs";
import * as shp from 'shpjs';
import proj4 from "proj4";

import { Button, ProgressBar } from "react-bootstrap";
import UploadAlert from "./UploadIssueAlert";
import {getUpload, ab2str} from "./uploader";

export default function SHPUploadButton (props){
  const [showAlert, setShowAlert] = useState(false);
  const [uploadButtonText, setuploadButtonText] = useState("Select the Catchment or Study Area")

  const projectCoordsGeojson = (geojson, reproject) => {
    var progress = 0
    for (var fid=0; fid < geojson.features.length; fid++) {
      //console.log(geojson.features[fid])
      for (var i=0; i < geojson.features[fid].geometry.coordinates.length; i++) {
        for (var j=0; j < geojson.features[fid].geometry.coordinates[i].length; j++) {
          
          // unsure how a coord pair may have more coords in but its happened...?
          if (geojson.features[fid].geometry.coordinates[i][j].length === 2){
            geojson.features[fid].geometry.coordinates[i][j] = reproject.forward(geojson.features[fid].geometry.coordinates[i][j])
          } else {
            for (var k=0; k< geojson.features[fid].geometry.coordinates[i][j].length; k++) {
              geojson.features[fid].geometry.coordinates[i][j][k] = reproject.forward(geojson.features[fid].geometry.coordinates[i][j][k])
            }
          }

          // get bbox
          if ((fid === 0) & (i === 0) & (j===0)) {
            var minlon = geojson.features[fid].geometry.coordinates[i][j][0];
            var maxlat = geojson.features[fid].geometry.coordinates[i][j][1]; 
            var maxlon = geojson.features[fid].geometry.coordinates[i][j][0];
            var minlat = geojson.features[fid].geometry.coordinates[i][j][1];
           } else {
            minlon = minlon < geojson.features[fid].geometry.coordinates[i][j][0] ? geojson.features[fid].geometry.coordinates[i][j][0] : minlon
            minlat = minlat < geojson.features[fid].geometry.coordinates[i][j][1] ? geojson.features[fid].geometry.coordinates[i][j][1] : minlat
            maxlon = maxlon > geojson.features[fid].geometry.coordinates[i][j][0] ? geojson.features[fid].geometry.coordinates[i][j][0] : maxlon
            maxlat = maxlat > geojson.features[fid].geometry.coordinates[i][j][1] ? geojson.features[fid].geometry.coordinates[i][j][1] : maxlat
          }
        }
      // progress
      progress = Math.round((fid/geojson.features.length)*100).toString()+"%"
      console.log(progress)
      setuploadButtonText(progress)
      // assign bbox
      geojson.features[fid].geometry.bbox = [minlon, minlat, maxlon, maxlat]
      }
    }
  console.log(geojson)
  return geojson
  }
  
  const handleFileSelected = async (e) => {

    const uploaded = await getUpload(e)
    
    if (! (('prj' in uploaded) & ('shp' in uploaded) & ('dbf' in uploaded)) ) {
      setShowAlert("Please select .shp, .dbf and .proj for the file of interest.")
    } else {
      // hide uploader modal
      // props.setShowModal(false)

      // get geojson
      var geojson = shp.combine([shp.parseShp(uploaded['shp'].content), shp.parseDbf(uploaded['dbf'].content)])

      // HANDLE prj
      uploaded['prj'].content = ab2str(uploaded['prj'].content)
      const reproject = proj4(uploaded['prj'].content, proj4.defs('EPSG:4326'))
      geojson = projectCoordsGeojson(geojson, reproject)

      // set geojson
      props.setGeojson(geojson)
      setuploadButtonText(uploaded['shp'].name.replace(/\.[^/.]+$/, ""))
    }
    console.log(uploaded);
    

    return uploaded;
  }

  let fileInput
  return (
    <>
      <UploadAlert showAlert={showAlert} setShowAlert={setShowAlert}/>
      <input
        ref={refParam => fileInput = refParam}
        onChange={handleFileSelected}
        type="file"
        style={{ display: "none" }}
        multiple
      />
      <Button  onClick={() => fileInput.click()} >
        <p style={{fontSize:"20px"}}>{uploadButtonText}</p>
        <p2 style={{fontSize:"10px"}}>.shp .dbf .prj</p2>
      </Button>
    </>
  );
}