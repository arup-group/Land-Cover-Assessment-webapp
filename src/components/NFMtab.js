import React, {useState, useEffect} from "react";
import {Card, Dropdown, DropdownButton, ListGroup, Tab, Tabs } from "react-bootstrap";
import CSVUploadButton from "./UploadCSVButton"
import UploadAlert from "./UploadIssueAlert"

export default function NFMtab (props) {
    const [colsMatch, setColsMatch] = useState(false)

    const get2DarrCol = (matrix, col) =>{
        var column = [];
        for(var i=1; i<matrix.length; i++){ // starts at 1 to avoid header
           if ( matrix[i][col] ){ column.push(matrix[i][col].toString()) }
           else { column.push(null) }
        }
        return column
    }

    const getGeojsonProp = (geojson, shpcol) =>{
        var column = [];
        for (var fid=0; fid < props.geojson.features.length; fid++) {
            if (props.geojson.features[fid].properties[shpcol]){column.push(props.geojson.features[fid].properties[shpcol].toString())}
            else{column.push(null)}
        }
        return column
    }

 
    const doColsMatch = (shpcol, csvcol) => {
        var csvAttr = get2DarrCol(props.csv.content, props.csv.content[0].indexOf(csvcol))
        var shpAttr = getGeojsonProp(props.geojson, shpcol)

        let intersection = csvAttr.filter(x => shpAttr.includes(x));
        if ((intersection.length === csvAttr.length-1) && (intersection.length === shpAttr.length)) {setColsMatch(true); return true}
        else {setColsMatch(false); return false}
    }


    const pairCols = () => {
        Object.values(props.csv.content[0]).map(csvcol=> {
            Object.keys(props.geojson.features[0].properties).map(shpcol => {
                if (doColsMatch(shpcol, csvcol)) {
                    props.setCsvDD(csvcol)
                    props.setShpDD(shpcol)
                }
            })
        })
    }


    useEffect(() => {
        if (props.geojson != null && props.csv != null) {props.setNfmDD(props.csv.content[0][1]); pairCols()}
        else if (props.geojson) { props.setShpDD(Object.keys(props.geojson.features[0].properties)[0])}
        else if (props.csv) { props.setCsvDD(props.csv.content[0][0]);  props.setNfmDD(props.csv.content[0][1]) }
    }, [props.geojson, props.csv]);

    if (props.geojson != null & props.csv == null){
    return(<>
            <Card>
                <CSVUploadButton setCSV={props.setCSV} setShowModal={props.setShowModal}/>
            </Card>
        </>
    )} else if (props.geojson != null && props.csv != null) {

        return(
            <>
            <div class="flex-grid">
            <div class="col">
            SHP attribute
            <DropdownButton
            title={props.shpDD}
            onSelect={e=>{props.setShpDD(e); console.log(e); doColsMatch(e, props.csvDD)}}
            key={'SHPdropdown'}
            id={'SHPdropdown'}>
            {Object.keys(props.geojson.features[0].properties).map(key => (
                <Dropdown.Item key={key} eventKey={key}>{key}</Dropdown.Item>
            ))}
            </DropdownButton>
         
        </div>

        <div class="col">
            CSV attribute
            <DropdownButton
            title={props.csvDD}
            onSelect={e=>{props.setCsvDD(e); doColsMatch(props.shpDD, e)}}
            key={'CSVdropdown'}
            id={'CSVdropdown'}>
            {Object.values(props.csv.content[0]).map(val=> (
                <Dropdown.Item key={val} eventKey={val}>{val}</Dropdown.Item>
            ))}
            </DropdownButton>
        </div>
        <div class="col">
            NFM measure
            <DropdownButton
            title={props.nfmDD}
            onSelect={e=>props.setNfmDD(e)}
            key={'NFMdropdown'}
            id={'NFMdropdown'}>
            {Object.values(props.csv.content[0]).map(val => (
                <Dropdown.Item key={val} eventKey={val}>{val}</Dropdown.Item>
            ))}
            </DropdownButton>
        </div>
        </div>
        <Card>
            <CSVUploadButton setCSV={props.setCSV} setShowModal={props.setShowModal}/>
        </Card>
      </>
        )
    } else{
        return null
    }
}




// shows examples of what is selected:

// <div>
// <ListGroup style={{flexDirection:'row'}} variant="flush">
// {Object.entries(props.geojson.features).map(([index, feat]) => index < 5 && (
//     <ListGroup.Item key={index} style={{fontSize:"10px", flexDirection:"wrap"}}>{feat.properties[shpDDtext].toString().substring(0, 40)}</ListGroup.Item>
// ))}
// </ListGroup>
// </div>