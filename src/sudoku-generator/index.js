import generator from 'sudoku';

const generateSudoku = () => {
    const generated = generator.makepuzzle().map(item => {
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

    return generated;
}

export default generateSudoku;