import React, {useState, useRef} from 'react';
import './App.css';
import generateSudoku from './sudoku-generator';
 
const squareTiles = {
  1: [1, 2, 3, 10, 11, 12, 19, 20, 21],
  2: [4, 5, 6, 13, 14, 15, 22, 23, 24],
  3: [7, 8, 9, 16, 17, 18, 25, 26, 27],
  4: [28, 29, 30, 37, 38, 39, 46, 47, 48],
  5: [31, 32, 33, 40, 41, 42, 49, 50, 51],
  6: [34, 35, 36, 43, 44, 45, 52, 53, 54],
  7: [55, 56, 57, 64, 65, 66, 73, 74, 75],
  8: [58, 59, 60, 67, 68, 69, 76, 77, 78],
  9: [61, 62, 63, 70, 71, 72, 79, 80, 81]
}
 
const [board, solution] = generateSudoku();

/* 
--> Fix highlighting when entering a new value
--> Add popup when solved
*/
 
function Cell (props) {
  const [value, setValue] = useState(props.value);
  let activeValue = props.selected ? parseInt(document.getElementById(props.selected).textContent) : 0;
 
  function handleKeyDown(e) {
    if(!e.target.className.includes("default") && e.keyCode >= 49 && e.keyCode <= 57) {
      setValue(String.fromCharCode(e.keyCode));
    }else if(!e.target.className.includes("default") && e.keyCode == 8){
      setValue(null);
    }
  }
 
  let className= props.id == props.selected ? "selected cell" : (props.selected && (Math.abs(props.id - props.selected) % 9 == 0) ? "highlighted cell" : "cell")
  if(props.value) className += " default";
  if(activeValue == value) className += " eqDigit";
  if(solution[props.id - 1] != value) className += " wrong";
  if(props.id != props.selected && props.activeSquare.includes(props.id)) className += " highlighted";
 
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
    return <Cell key={cellIndex} activeSquare={props.activeSquare} value={cell} id={startNum+cellIndex+1} selected={selected} />
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
  const activeSquare = selectedIndex ? Object.values(squareTiles).filter(value => value.includes(selectedIndex))[0] : [];
 
  const rows = board.map((row, rowIndex) => {
    return <Row key={rowIndex} activeSquare={activeSquare} number={rowIndex} selectedIndex={selectedIndex} content={row}/>
  })
 
  function navigate(e) {
    if(e.keyCode == 39 && selectedIndex < 81){
      document.getElementById(selectedIndex + 1).focus();
      setSelected(selectedIndex + 1);
    }
    else if(e.keyCode == 37 && selectedIndex > 1){
      document.getElementById(selectedIndex - 1).focus();
      setSelected(selectedIndex - 1);
    }
    else if(e.keyCode == 38 && (selectedIndex - 9) > 1){
      document.getElementById(selectedIndex - 9).focus();
      setSelected(selectedIndex - 9);
    }
    else if(e.keyCode == 40 && (selectedIndex + 9) < 81){
      document.getElementById(selectedIndex + 9).focus();
      setSelected(selectedIndex + 9);
    }
  }
 
  return (
    <div onKeyDown={(e) => navigate(e)} onClick={(e) => setSelected(parseInt(e.target.id) || 0)} className="App">
      {rows}
    </div>
  );
}
 
export default App;