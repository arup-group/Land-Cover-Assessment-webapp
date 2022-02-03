
import React, {useState} from "react";
import { Button } from "react-bootstrap";

import UploadAlert from "./UploadIssueAlert";
import {getUpload, ab2str, csv2arr} from "./uploader";

export default function CSVUploadButton (props) {
    const [uploadButtonText, setuploadButtonText] = useState("Select the NFM measures")
    const [showAlert, setShowAlert] = useState(false);

    const handleFileSelected = async (e) => {

        const uploaded = await getUpload(e)
    
        if (!('csv' in uploaded)) {
          setShowAlert("Please select a .csv")
        } else {
            uploaded['csv'].content = csv2arr(ab2str(uploaded['csv'].content))
            setuploadButtonText(uploaded['csv'].name.replace(/\.[^/.]+$/, ""))
            props.setCSV(uploaded['csv'])
          // hide uploader modal
          // props.setShowModal(false)
        }
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
            <p2 style={{fontSize:"10px"}}>.csv</p2>
          </Button>
        </>
      );
}

