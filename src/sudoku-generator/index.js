import generator from 'sudoku';

const generateSudoku = () => {
    let newSudoku = generator.makepuzzle();
    let solution = generator.solvepuzzle(newSudoku).map(num => num + 1);

    const generated = newSudoku.map(item => {
        if(item != null) return item + 1;
        else return null;
    }).reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index/9);

        if(!resultArray[chunkIndex]){
            resultArray[chunkIndex] = [];
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
    }, []);

    return [generated, solution];
}

export default generateSudoku;