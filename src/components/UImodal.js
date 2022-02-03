import React, {useState} from "react";
import { Modal, Card, Button } from "react-bootstrap";

import "./styles.css";

import FileUploadButton from "./UploadSHPButton";
import OptionsForm from "./OptionsForm";
import UITabs from "./UITabs"

export default function UImodal(props) {
    const [modalShow, setShowModal] = useState(true);
    
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
            <Card.Header  className="h5"> Landcover Assessment </Card.Header>
            <UITabs 
              setCSV={props.setCSV}
              csv={props.csv}
              APIlist={props.APIlist}
              changeChecked={props.changeChecked}
              setShowModal={setShowModal}
              setGeojson={props.setGeojson}
              geojson={props.geojson}/>
          </Card>
        </Modal.Body>
      </Modal>
    );
}


// <Card>     
// <Card.Header  className="text-center"> <Button>{'<'}</Button> Landcover Assessment <Button>{'>'}</Button></Card.Header>
// <Card.Body>
//   <OptionsForm APIlist={props.APIlist} changeChecked={props.changeChecked}/>
// </Card.Body>
// <FileUploadButton setGeojson={props.setGeojson} setShowModal={setShowModal}/>
// </Card> 