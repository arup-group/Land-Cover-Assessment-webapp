import React, {useState} from "react";
import { Modal, Card, Button } from "react-bootstrap";
import {FaInfo, FaUndo} from 'react-icons/fa';

import "./styles.css";

import FileUploadButton from "./UploadSHPButton";
import OptionsForm from "./OptionsForm";
import UITabs from "./UITabs"
import InfoPage from "./InfoPage"

export default function UImodal(props) {
    const [modalShow, setShowModal] = useState(true);
    const [showInfo, setShowInfo] = useState(false)
    
    var header = "Landcover Assessment"
    var icon = (<FaInfo/>)
    var content = (<UITabs 
      setCSV={props.setCSV}
      csv={props.csv}
      APIlist={props.APIlist}
      changeChecked={props.changeChecked}
      setShowModal={setShowModal}
      setGeojson={props.setGeojson}
      geojson={props.geojson}/>)
    if (showInfo) {
      header = "Info"
      icon = (<FaUndo/>)
      content=(<InfoPage/>)
    }

    return (
      <Modal
        show={modalShow}
        backgroundColor='rgba(0,0,0,0)'
        animationType="fade"
        onHide={() => setShowModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop={ 'static' } 
        keyboard={ false }
        style={{display:'flex', justifycontent:'center', alignitems:'center'}}
      >
        <Modal.Body>
          <Card  style={{display:'flex', justifycontent:'center', alignitems:'center'}} >
            <Card.Header  className="h5"> {header} 
              <Button variant="secondary" size="sm" className="float-sm-right" onClick={()=>setShowInfo(!showInfo)}>
                {icon}
              </Button> 
            </Card.Header>
            {content}
          </Card>
        </Modal.Body>
      </Modal>
    );
}
