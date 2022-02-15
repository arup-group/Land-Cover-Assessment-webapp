import proj4Src from "proj4";
import React, {useState} from "react";
import {Card, Tab, Tabs, Button } from "react-bootstrap";
import OptionsForm from "./OptionsForm";
import SHPUploadButton from "./UploadSHPButton";
import CSVUploadButton from "./UploadCSVButton"
import NFMtab from "./NFMtab";

export default function UITabs(props) {

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
        <NFMtab csv={props.csv} setCSV={props.setCSV} geojson={props.geojson} setShowModal={props.setShowModal}/>
    </Tab>
    <Tab eventKey="run" title="Run" disabled={isDisabled}>
        <Card.Body>
            <p>Estimated run time: {props.geojson ? (Math.round(Math.log10(props.geojson.features.length)+1)*10) : 0} mins</p>
            <Button>Start</Button>
        </Card.Body>
    </Tab>
    </Tabs>
    </Card>
    )
}


