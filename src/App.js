import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Map from './components/map'
import UImodal from './components/UImodal'
import ExportCSV from './components/ExportCSV'
import PostGEOJSON from './components/PostGEOJSON'

import APIlist from "./assets/APIsList.json"


function App() {
  const [geojson, setGeojson] = useState(null)
  const [csv, setCSV] = useState(null)

  const [run, setRun] = useState(false) // RUN THE THING!!
  const [checkedState, setCheckedState] = useState(
    new Array(APIlist.length).fill(true)
  )

  const changeChecked = (position) => {
    setCheckedState(checkedState.map((item, index) => 
      index.toString() === position.toString() ? !item : item
    ))
  }

  var filteredAPIlist = checkedState.map((checked) => {
    return APIlist.filter((API) => checked)
  })

  console.log(filteredAPIlist)
  return (
    <>
    <UImodal setGeojson={setGeojson} geojson={geojson} setCSV={setCSV} csv={csv} APIlist={APIlist} changeChecked={changeChecked} />
    <Map geojson={geojson}/>
    </>
  );
}

export default App;
//     <ExportCSV geojson={geojson}/>

//     <PostGEOJSON geojson={geojson} APIlist={filteredAPIlist}/>
