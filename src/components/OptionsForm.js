import React from "react"
import { Form } from "react-bootstrap"

export default function OptionsForm(props){


    return(
    <Form>
        {props.APIlist.map((API, index) => (
        <div key={index}>
        <Form.Check 
            type={"checkbox"}
            defaultChecked
            id={index}
            label={API.name}
            onChange={() => props.changeChecked(index)}
        />
        </div>
    ))}
    </Form>)
}