import React, { useState, useEffect } from "react";
import Row from "./row";

function Board(props) {
  const [selectedIndex, setSelected] = useState(null);
  const activeSquare = selectedIndex
    ? Object.values(props.squareTiles).filter((value) =>
        value.includes(selectedIndex)
      )[0]
    : [];
  const [activeValue, setActiveValue] = useState(0);
  const [gameCounter, setGameCounter] = useState(0);

  function changeActiveValue(value) {
    setActiveValue(value);
  }

  //Maps the generated grid to return 9 rows, each consisting of 9 values for each cell
  let rows = props.board.map((row, rowIndex) => {
    return (
      <Row
        gameCounter={gameCounter}
        activeValue={activeValue}
        changeActiveValue={changeActiveValue}
        solution={props.solution}
        activeSquare={activeSquare}
        number={rowIndex}
        selectedIndex={selectedIndex}
        content={row}
      />
    );
  });

  //Remove classes from cells, selected cell and increment the game counter when a new game is generated
  useEffect(() => {
    const cells = document.getElementsByClassName("cell");

    for (const cell of cells) {
      cell.classList.remove("wrong");
      cell.classList.remove("eqDigit");
    }

    setSelected(null);
    setGameCounter(gameCounter + 1);
    setActiveValue(0);
  }, [props.board]);

  //Enables the user to navigate through the board with the arrow keys or W, A, S, D
  function navigate(e) {
    if ((e.keyCode === 39 || e.keyCode === 68) && selectedIndex < 81) {
      document.getElementById(selectedIndex + 1).focus();
      setSelected(selectedIndex + 1);
    } else if ((e.keyCode === 37 || e.keyCode === 65) && selectedIndex > 1) {
      document.getElementById(selectedIndex - 1).focus();
      setSelected(selectedIndex - 1);
    } else if (
      (e.keyCode === 38 || e.keyCode === 87) &&
      selectedIndex - 9 > 0
    ) {
      document.getElementById(selectedIndex - 9).focus();
      setSelected(selectedIndex - 9);
    } else if (
      (e.keyCode === 40 || e.keyCode === 83) &&
      selectedIndex + 9 < 82
    ) {
      document.getElementById(selectedIndex + 9).focus();
      setSelected(selectedIndex + 9);
    }
  }

  return (
    <div
      onKeyDown={(e) => navigate(e)}
      onClick={(e) => setSelected(parseInt(e.target.id) || 0)}
      className="board"
    >
      {rows}
    </div>
  );
}

export default Board;
