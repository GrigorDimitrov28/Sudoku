import React, { useState, useEffect } from "react";

function Cell(props) {
  const solution = props.solution;
  const [value, setValue] = useState(props.value);

  //Defines initial class list for the cell
  let className =
    props.id === props.selected
      ? "selected cell"
      : props.selected && Math.abs(props.id - props.selected) % 9 === 0
      ? "highlighted cell"
      : "cell";

  //Allows the user to set a value from 1-9 for a cell or delete the current value
  function handleKeyDown(e) {
    if (
      !e.target.className.includes("default") &&
      e.keyCode >= 49 &&
      e.keyCode <= 57
    ) {
      setValue(String.fromCharCode(e.keyCode));
      props.changeActiveValue(parseInt(String.fromCharCode(e.keyCode)));
    } else if (!e.target.className.includes("default") && e.keyCode === 8) {
      setValue(null);
      props.changeActiveValue(null);
    }
  }

  //Delete the values of the cells when a new game is generated
  useEffect(() => {
    if (!className.includes("default")) setValue(null);
  }, [props.gameCounter]);

  //Sets the value for the default cells when a new game is generated
  useEffect(() => {
    setValue(props.value);
    props.changeActiveValue(value);
  }, [props.value]);

  //Changes the currently selected value when a new cell is in focus
  useEffect(() => {
    props.changeActiveValue(
      props.selected
        ? parseInt(document.getElementById(props.selected).textContent)
        : 0
    );
  }, [props.selected]);

  //Highlight a cell based on its value and position
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

export default Cell;
