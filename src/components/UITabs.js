import proj4Src from "proj4";
import React, {useState} from "react";
import {Card, Tab, Tabs, Button } from "react-bootstrap";
import OptionsForm from "./OptionsForm";
import SHPUploadButton from "./UploadSHPButton";
import CSVUploadButton from "./UploadCSVButton"
import NFMtab from "./NFMtab";
import { setSourceMapRange } from "typescript";
import { Alert } from "bootstrap";

export default function UITabs(props) {
    const [message, setMessage] = useState("")

    var isDisabled = true
    if (props.geojson){
        isDisabled = false
    }
    
    return(
    <Card>
    <Tabs
        fill justify    
        defaultActiveKey="home"
        className="mb-3"
        variant="pills"
    >

    <Tab eventKey="home" title="Landcover">
            <Card.Body>
                <OptionsForm APIlist={props.APIlist} changeChecked={props.changeChecked}/>
            </Card.Body>
            <Card>
                <SHPUploadButton setGeojson={props.setGeojson} setShowModal={props.setShowModal}/>
            </Card>
    </Tab>
    <Tab eventKey="nfm" title="NFM" disabled={isDisabled}>
        <NFMtab csv={props.csv} setCSV={props.setCSV} geojson={props.geojson} setShowModal={props.setShowModal}
        shpDD={props.shpDD}
        csvDD={props.csvDD}
        nfmDD={props.nfmDD}       
        setShpDD={props.setShpDD}
        setCsvDD={props.setCsvDD}
        setNfmDD={props.setNfmDD}  />
    </Tab>
    <Tab eventKey="run" title="Run" disabled={isDisabled}>
        <Card.Body>
            <p>{message}</p>
            <Button onClick={()=>{props.PostGEOJSON(props.geojson, props.csv, props.APIlist, props.nfmDD, props.csvDD, props.shpDD, props.setGeojson, props.setShowModal); setMessage("running...")}}>Start</Button>
        </Card.Body>
    </Tab>
    </Tabs>
    </Card>
    )
}


