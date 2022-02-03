import React from "react";
import { Alert } from "react-bootstrap";


export default function UploadAlert(props) {
  
    if (props.showAlert) { // props.setShowModal(true) // why doesnt this work
      return (
        <Alert variant="danger" onClose={() =>  {props.setShowAlert(false)}} dismissible style={{position:'absolute', display:'flex', justifycontent:'center', alignitems:'center'}}>  
          <p>
           {props.showAlert}
          </p>
        </Alert>
      );
    } else return null
  }

// ALERT options: 
//  Please select .shp, .dbf and .proj for the file of interest.