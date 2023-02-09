import {nextKnightMoves} from './KnightMovesChess.js';


function heuristic(visited, mt) {
    let [mti, mtj] = mt;
    let next = nextKnightMoves(mti, mtj);
    let cnt = 0;
    for(let [nexti, nextj] of next) {
        if (visited[nexti][nextj] === 0) {
            cnt += 1;
        }
    }
    return cnt;
}
function generateTourHelper(visited, i, j, step) {
    visited[8-i-1][j] = step;
    let next = nextKnightMoves(i, j);
    next = next.filter((mT) => {
        let [mti, mtj] = mT;
        return visited[8-mti-1][mtj] === 0;
    });
    if (step === 63) {
        return true;
    }
    if (next.length === 0 && step === 63) {
        return true;
    } else if (next.length === 0) {
        return false;
    }
    next = next.sort((mt1, mt2) => {
        let h1 = heuristic(visited, mt1);
        let h2 = heuristic(visited, mt2);
        return h1-h2
    });
    for (let moveTuple of next) {
        let [mki, mkj] = moveTuple;
        let hasTour = generateTourHelper(visited, mki, mkj, step+1);
        if (hasTour) {
            return true;
        } else {
            visited[8-mki-1][mkj] = 0;
        }
    }
}

function generateKnightsTour(knightGameState) {
    let [kI, kJ] = knightGameState.knightPos;
    let visited = []
    for(let i = 0; i< 8; i++) {
        let copyOfRow = [...knightGameState.boardState[i]];
        visited.push(copyOfRow);
    }
    let step = 1;
    let next = nextKnightMoves(kI, kJ);
    next = next.sort((mT1, mT2) => {
        let h1 = heuristic(visited, mT1);
        let h2 = heuristic(visited, mT2);
        return (h1-h2);
    });
    for (let moveTuple of next) {
        let foundTour = generateTourHelper(visited, moveTuple[0], moveTuple[1], step);
        if (foundTour) {
            console.log(visited);
            return visited;
        }
    }
}

export {generateKnightsTour};