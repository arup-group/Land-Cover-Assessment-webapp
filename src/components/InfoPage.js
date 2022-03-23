import React from "react"
import { Accordion, Image, Table  } from "react-bootstrap"
import { isGetAccessorDeclaration } from "typescript"

import APIlist from "../assets/APIsList.json"

export default function InfoPage(){

    return (
        <Accordion defaultActiveKey="">
        <Accordion.Item eventKey="0">
          <Accordion.Header>What shapefile should I upload?</Accordion.Header>
          <Accordion.Body>
            <div/>
            <p>Upload a shapefile containing the area you wish to assess.</p> <div/>
            <p>If you are making a baseline assessment, the shapefile may be catchments.</p>
            <div/>
            <Image style={{height:'auto',width:'100%'}} rounded fluid src={process.env.PUBLIC_URL+"/ExampleCatchment.jpg"}/>
            <div/>
            <p>If you are making an assessment for baseline landcover and resultant landcover following NFM implementation, this shapefile will be the fishnet grid.</p>
            <div/>
            <Image rounded fluid src={process.env.PUBLIC_URL+"/ExampleGrid.jpg"}/>

          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>What data is fetched?</Accordion.Header>
          <Accordion.Body>
          <Table responsive striped hover size="sm">
            <thead>
            <tr>
                <th>Dataset</th>
                <th>Layer</th>
                <th>Field</th>
                <th>Endpoint</th>
            </tr>
            </thead>
            <tbody>
            {APIlist.map((api, i)=> (
                <tr>
                    <th>{api.name}</th>
                    <th>{api.layer.id}</th>
                    <th>{api.layer.field}</th>
                    <th>{api.endpoint}</th>
                </tr>
            ))}
            </tbody>
        </Table>   
        </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>NFM tab?</Accordion.Header>
          <Accordion.Body>
          <div/>
          <p>NFM is <b>Natural Flood Management.</b> This tab enables a user to assess land cover change after NFM measures are implemented.</p>
          <div/>
          <p>Start by uploading an NFM csv. This must contain two columns, <b>selected NFM measure</b> and the <b>OID of the feature in the study grid.</b> </p>    
          <div/>
            <Image style={{height:'auto',width:'100%'}} rounded fluid src={process.env.PUBLIC_URL+"/ExampleNFMcsv.jpg"}/>
          <div/>
          <div/>
          <p>Using the shp dropdown <b>select the unqiuely identifying column that corresponds to the id in the csv</b> you have selected with the csv dropdown.</p>    
          <div/>
          <p>Finally, using the NFM measure dropdown <b>select the column containing the NFM measure</b></p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    )
}