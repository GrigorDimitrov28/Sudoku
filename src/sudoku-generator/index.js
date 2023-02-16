const generateSudoku = (difficulty) => {
    const newSudokuString = Window.sudoku.generate(difficulty);
    const solutionString = Window.sudoku.solve(newSudokuString);

    const board = Window.sudoku.board_string_to_grid(newSudokuString);
    const solution = solutionString.split("");

    return [board, solution];
}

export default generateSudoku;