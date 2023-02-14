import React, {useState, useRef} from 'react';
import './App.css';
import generateSudoku from './sudoku-generator';

const board = generateSudoku();
/* 
--> Highlight cell's square
--> Solve a puzzle
--> Read-only generated numbers
--> Highlight cells with same value
--> Highlight cells with wrong value
*/

function Cell (props) {
  const [value, setValue] = useState(props.value);

  function handleKeyDown(e) {
    console.log(e.keyCode)
    if(e.keyCode >= 49 && e.keyCode <= 57) {
      setValue(String.fromCharCode(e.keyCode));
    }else if(e.keyCode == 8){
      setValue(null);
    }
  }

  const className= props.id == props.selected ? "selected cell" : (props.selected && (Math.abs(props.id - props.selected) % 9 == 0) ? "highlighted cell" : "cell")

  return (
    <div id={props.id} tabIndex="0" className={className} maxLength="1" onKeyDown={(e)=> {
      handleKeyDown(e);
    }}> 
      {value}
    </div>
  )
}

function Row (props) {
  const startNum = props.number * 9;
  const selected = props.selectedIndex;
  const rowContent = props.content;

  const cells = rowContent.map((cell, cellIndex) => {
    return <Cell value={cell} id={startNum+cellIndex+1} selected={selected} />
  })
  
  return (
    <div className={
      selected && selected > startNum && selected <= startNum + 9 ? "highlighted row" : "row"
    }>
      {cells}
    </div>
  )
}


function App() {
  const [selectedIndex, setSelected] = useState(null);

  const rows = board.map((row, rowIndex) => {
    return <Row number={rowIndex} selectedIndex={selectedIndex} content={row}/>
  })

  function navigate(e) {
    console.log(e.keyCode);
    if(e.keyCode == 39){
      document.getElementById(selectedIndex + 1).focus();
      setSelected(selectedIndex + 1);
    }
    else if(e.keyCode == 37){
      document.getElementById(selectedIndex - 1).focus();
      setSelected(selectedIndex - 1);
    }
    else if(e.keyCode == 38){
      document.getElementById(selectedIndex - 9).focus();
      setSelected(selectedIndex - 9);
    }
    else if(e.keyCode == 40){
      document.getElementById(selectedIndex + 9).focus();
      setSelected(selectedIndex + 9);
    }
  }

  return (
    <div onKeyDown={(e) => navigate(e)} onClick={(e) => setSelected(parseInt(e.target.id) || 0)} className="App">
      <h1>{selectedIndex}</h1>
      {rows}
    </div>
  );
}

export default App;
