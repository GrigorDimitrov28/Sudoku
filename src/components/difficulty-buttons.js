import React from 'react';

const DifficultyButtons = (props) => {
    return (
        <div className="button-container">
            <button onClick={() => props.generateSudokuHandler("easy")}>Easy</button>
            <button onClick={() => props.generateSudokuHandler("medium")}>Medium</button>
            <button onClick={() => props.generateSudokuHandler("hard")}>Hard</button>
            <button onClick={() => props.generateSudokuHandler("very-hard")}>Very hard</button>
            <button onClick={() => props.generateSudokuHandler("insane")}>Insane</button>
            <button onClick={() => props.generateSudokuHandler("inhuman")}>Inhuman</button>
        </div>
    )
}

export default DifficultyButtons;