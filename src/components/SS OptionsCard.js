import React from "react"
import { Card, Form } from "react-bootstrap"

import FileUploadButton from "./UploadSHPButton";
import OptionsForm from "./OptionsForm";


import options from '../assets/APIs.json'

export default function OptionsCard(props){
    
    const buildForm = () => {
        var i = 0
        return(
            <Card.Body>
                {Object.entries(options).map(([header, list]) => {
                <Card.Subtitle  className="mb-2 text-muted">{header}</Card.Subtitle>
                    {Object.entries(list).map(([index, item]) =>{
                        i++
                        return(
                            <div key={i}>
                            <Form.Check 
                                type={"checkbox"}
                                defaultChecked
                                id={i}
                                label={item.name}
                                onChange={() => props.changeChecked(i)}
                            />
                            </div>
                        )
                    })}
                })}    
            </Card.Body>)
    }

    return(
        <Card>
            <Card.Header as="h5">Landcover Assessment</Card.Header>
                {buildForm(options)}
            <FileUploadButton setGeojson={props.setGeojson} setShowModal={props.setShowModal}/>
        </Card>
    )
}