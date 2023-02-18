import React from "react";
import Cell from "./cell";

function Row(props) {
  const startNum = props.number * 9;
  const selected = props.selectedIndex;
  const rowContent = props.content;

  //Maps through the array of value and renders a Cell component for each one
  const cells = rowContent.map((cell, cellIndex) => {
    return (
      <Cell
        gameCounter={props.gameCounter}
        activeValue={props.activeValue}
        changeActiveValue={props.changeActiveValue}
        solution={props.solution}
        activeSquare={props.activeSquare}
        value={cell === "." ? null : cell}
        id={startNum + cellIndex + 1}
        selected={selected}
      />
    );
  });

  return (
    <div
      className={
        selected && selected > startNum && selected <= startNum + 9
          ? "highlighted row"
          : "row"
      }
    >
      {cells}
    </div>
  );
}

export default Row;
