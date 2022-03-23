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

  const [shpDD, setShpDD] = useState("")
  const [csvDD, setCsvDD] = useState("")
  const [nfmDD, setNfmDD] = useState("")

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
    <UImodal setGeojson={setGeojson} geojson={geojson} setCSV={setCSV} csv={csv} APIlist={APIlist} changeChecked={changeChecked}
            shpDD={shpDD} csvDD={csvDD} nfmDD={nfmDD} setShpDD={setShpDD} setCsvDD={setCsvDD} setNfmDD={setNfmDD}
            PostGEOJSON={PostGEOJSON}/>
    <Map geojson={geojson}/>
    </>
  );
}

export default App;
//     <ExportCSV geojson={geojson}/>

//     <PostGEOJSON geojson={geojson} APIlist={filteredAPIlist}/>
