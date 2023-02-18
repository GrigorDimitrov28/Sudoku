import React, { useState } from "react";
import "./App.css";
import generateSudoku from "./sudoku-generator";
import DifficultyButtons from "./components/difficulty-buttons";
import Board from "./components/board";

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
  9: [61, 62, 63, 70, 71, 72, 79, 80, 81],
};

/* TODO
--> Pass only the correct value to a cell, not the whole solution
--> Refactor and split code
*/
function App() {
  const [[board, solution], setGame] = useState(generateSudoku("easy"));

  function generateGameHandler(difficulty) {
    setGame(generateSudoku(difficulty));
  }

  return (
    <div className="wrapper">
      <h1>Sudoku.js</h1>
      <Board squareTiles={SQUARE_TILES} board={board} solution={solution} />
      <DifficultyButtons generateSudokuHandler={generateGameHandler} />
    </div>
  );
}

export default App;
