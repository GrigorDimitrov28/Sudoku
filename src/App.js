import React, { useState, useEffect } from 'react';
import './App.css';
import generateSudoku from './sudoku-generator';
 

//Cell IDs for every square on the board
const SQUARE_TILES = {
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

/* TODO
--> Pass only the correct value to a cell, not the whole solution
--> Refactor and split code
*/
 
function Cell(props) {
  const solution = props.solution;
  const [value, setValue] = useState(props.value);

  let className =
    props.id === props.selected
      ? "selected cell"
      : props.selected && Math.abs(props.id - props.selected) % 9 === 0
      ? "highlighted cell"
      : "cell";

  function handleKeyDown(e) {
    if (
      !e.target.className.includes("default") &&
      e.keyCode >= 49 &&
      e.keyCode <= 57
    ) {
      setValue(String.fromCharCode(e.keyCode));
      props.changeActiveValue(parseInt(String.fromCharCode(e.keyCode)));
    } else if (
      !e.target.className.includes("default") &&
      e.keyCode === 8
    ) {
      setValue(null);
      props.changeActiveValue(null);
    }
  }

  useEffect(() => {
    if(!className.includes("default")) setValue(null);
  }, [props.gameCounter])

  useEffect(() => {
    setValue(props.value);
    props.changeActiveValue(value);
  }, [props.value])

  useEffect(() => {
    props.changeActiveValue(
      props.selected
        ? parseInt(document.getElementById(props.selected).textContent)
        : 0
    );
  }, [props.selected]);

  
  if (props.activeValue && value == props.activeValue) className += " eqDigit";
  if (props.value) className += " default";
  if (solution[props.id - 1] !== value) className += " wrong";
  if (props.id !== props.selected && props.activeSquare.includes(props.id))
    className += " highlighted";
  
  return (
    <div
      key={props.id - props.value}
      id={props.id}
      tabIndex="0"
      className={className}
      onKeyDown={(e) => {
        handleKeyDown(e);
      }}
    >
      {value}
    </div>
  );
}
 
function Row (props) {
  const startNum = props.number * 9;
  const selected = props.selectedIndex;
  const rowContent = props.content;
 
  const cells = rowContent.map((cell, cellIndex) => {
    return <Cell 
    gameCounter={props.gameCounter}
    activeValue={props.activeValue}
    changeActiveValue={props.changeActiveValue}
    solution={props.solution} 
    activeSquare={props.activeSquare} 
    value={cell === "." ? null : cell} 
    id={startNum+cellIndex+1} 
    selected={selected} />
  })
 
  return (
    <div  className={
      selected && selected > startNum && selected <= startNum + 9 ? "highlighted row" : "row"
    }>
      {cells}
    </div>
  )
}

function Board (props) {
  const [selectedIndex, setSelected] = useState(null);
  const activeSquare = selectedIndex ? Object.values(SQUARE_TILES).filter(value => value.includes(selectedIndex))[0] : [];
  const [activeValue, setActiveValue] = useState(0);
  const [gameCounter, setGameCounter] = useState(0);

  function changeActiveValue(value) {
    setActiveValue(value)
  }


  let rows = props.board.map((row, rowIndex) => {
    return <Row 
    gameCounter={gameCounter}
    activeValue={activeValue}
    changeActiveValue={changeActiveValue}
    solution={props.solution} 
    activeSquare={activeSquare} 
    number={rowIndex} 
    selectedIndex={selectedIndex} 
    content={row}/>
  })

  useEffect(() => {
    const cells = document.getElementsByClassName("cell");
    
    for(const cell of cells) {
      cell.classList.remove("wrong");
      cell.classList.remove("eqDigit");
    }

    setSelected(null);
    setGameCounter(gameCounter + 1);
    setActiveValue(0);
  }, [props.board])

  function navigate(e) {
    if((e.keyCode === 39 || e.keyCode === 68) && selectedIndex < 81){
      document.getElementById(selectedIndex + 1).focus();
      setSelected(selectedIndex + 1);
    }
    else if((e.keyCode === 37 || e.keyCode === 65) && selectedIndex > 1){
      document.getElementById(selectedIndex - 1).focus();
      setSelected(selectedIndex - 1);
    }
    else if((e.keyCode === 38 || e.keyCode === 87) && (selectedIndex - 9) > 0){
      document.getElementById(selectedIndex - 9).focus();
      setSelected(selectedIndex - 9);
    }
    else if((e.keyCode === 40 || e.keyCode === 83) && (selectedIndex + 9) < 82){
      document.getElementById(selectedIndex + 9).focus();
      setSelected(selectedIndex + 9);
    }
  }

  return(
    <div onKeyDown={(e) => navigate(e)} onClick={(e) => setSelected(parseInt(e.target.id) || 0)} className="board">
      {rows}
    </div>
  )
  
}
 
 
function App() {
  
  const[[board,solution], setGame] = useState(generateSudoku("easy"));

  return (
    <div className="wrapper">
      <h1>Sudoku.js</h1>
      <Board board={board} solution={solution}/>
      <div className="button-container">
        <button onClick={() => setGame(generateSudoku("easy"))}>Easy</button>
        <button onClick={() => setGame(generateSudoku("medium"))}>Medium</button>
        <button onClick={() => setGame(generateSudoku("hard"))}>Hard</button>
        <button onClick={() => setGame(generateSudoku("very-hard"))}>Very hard</button>
        <button onClick={() => setGame(generateSudoku("insane"))}>Insane</button>
        <button onClick={() => setGame(generateSudoku("inhuman"))}>Inhuman</button>
      </div>
    </div>
  );
}
 
export default App;