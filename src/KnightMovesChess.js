function findKnightPos(board) {
    for(let i = 0; i < 8; i++) {
        let row = board[i];
        for (let j = 0; j < 8; j++) {
            if (row[j] === -1) {
                return [8-i-1,  j];
            }
        }
    }
}


function nextKnightMoves(kI, kJ) {
    let moves = [];
    if (kI + 2 < 8 && kJ + 1 < 8) {
        moves.push([kI + 2, kJ + 1]);
    }
    if (kI + 2 < 8 && kJ - 1 >= 0) {
        moves.push([kI + 2, kJ - 1]);
    }
    if (kI + 1 < 8 && kJ + 2 < 8) {
        moves.push([kI + 1, kJ + 2]);
    }
    if (kI + 1 < 8 && kJ - 2 >= 0) {
        moves.push([kI + 1, kJ - 2]);
    }
    if (kI - 2 >= 0 && kJ + 1 < 8) {
        moves.push([kI - 2, kJ + 1]);
    }
    if (kI - 2 >= 0 && kJ - 1 >= 0) {
        moves.push([kI - 2, kJ - 1]);
    }
    if (kI - 1 >= 0 && kJ + 2 < 8) {
        moves.push([kI - 1, kJ + 2]);
    }
    if (kI - 1 >= 0 && kJ - 2 >= 0) {
        moves.push([kI - 1, kJ - 2]);
    }
    return moves;
}

function copyBoard(boardState) {
    let copyOfBoard = []
    for (let i = 0; i < 8; i++) {
        let copyOfRow = [...boardState[i]];
        copyOfBoard.push(copyOfRow);
    }
    return copyOfBoard;
}

function copyState(knightGameState) {
    let copyOfBoardState = copyBoard(knightGameState.boardState);
    let copyOfKnight = [...knightGameState.knightPos];
    return {
        'boardState': copyOfBoardState,
        'knightPos': copyOfKnight,
    }
}

function generateHeatMap(knightGameState) {
    let heatMap = [];
    for(let i = 0; i < 8; i++) {
        let copyOfRow = [...knightGameState.boardState[i]]
        for (let j = 0; j < 8; j++) {
            if (copyOfRow[j] === 0) {
                copyOfRow[j] = Infinity;
            }
        }
        heatMap.push(copyOfRow);
    }
    let [kI, kJ] = knightGameState.knightPos;
    let fringe = []
    let knightMoves = nextKnightMoves(kI,kJ);
    knightMoves.forEach((moveTuple) => fringe.push([moveTuple, 1]));
    while (fringe.length) {
        let [nextMov, steps] = fringe.shift();
        let [nextI, nextJ] = nextMov;
        heatMap[8-nextI-1][nextJ] = Math.min(heatMap[8-nextI-1][nextJ], steps);
        let nextMoves = nextKnightMoves(nextI, nextJ);
        nextMoves.forEach((moveTuple) => {
            let [nI, nJ] = moveTuple;
            if (heatMap[8-nI-1][nJ] > steps + 1) {
                fringe.push([[nI, nJ], steps + 1]);
            }
        })
    }
    return heatMap;
}

function convertStateToFen(board) {
    let fenString = "";
    for(let i = 0; i < 8; i++) {
        let row = board[i];
        let fenBlock = "";
        var beforeCount = [0];
        var afterCount = [0];
        var countToAggregate = beforeCount;
        let hasKnight = false;
        for (let j = 0; j < 8; j++) {
            let elem = row[j];
            if (elem === -1 ) {
                countToAggregate = afterCount;
                hasKnight = true;
                continue;
            }
            countToAggregate[0] += 1;
        }
        if (!hasKnight) {
            fenBlock = "8";
        } else {
            if (beforeCount[0] === 0) {
                fenBlock = "" + "N" + afterCount[0];
            } else if (afterCount[0] === 0) {
                fenBlock = beforeCount[0] + "N";
            } else {
                fenBlock = "" + beforeCount[0] + "N" + afterCount[0];
            }
        }
        fenString += fenBlock;
        if (i < 7) {
            fenString += "/";
        }
    }
    console.log(fenString);
    return fenString;
}

export {convertStateToFen, copyState, findKnightPos, nextKnightMoves, generateHeatMap};