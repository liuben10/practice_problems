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


function copyTour(tour) {
    let copyOfTour = []
    for(let t of tour) {
        copyOfTour.push(t);
    }
    return copyOfTour;
}

function generateKnightsTourSolutionBacktrackingHelper(visited, kI, kJ, step, backtrackingSteps, tourSteps) {
    visited[8-kI-1][kJ] = step;
    tourSteps[0] += 1
    if (step === 35) {
        return {'solution': visited, 'tourSteps': tourSteps[0], 'backtrackingSteps': backtrackingSteps[0]}
    }
    let next = nextKnightMoves(kI, kJ, 6);
    for (let moveTuple of next) {
        if (visited[8-moveTuple[0]-1][moveTuple[1]] !== 0) {
            continue;
        }
        let foundTour = generateKnightsTourSolutionBacktrackingHelper(visited, moveTuple[0], moveTuple[1], step + 1, backtrackingSteps, tourSteps);
        if (foundTour) {
            return {'solution': visited, 'tourSteps': tourSteps[0], 'backtrackingSteps': backtrackingSteps[0]};
        } else {
            visited[8-moveTuple[0]-1][moveTuple[1]] = 0;
            backtrackingSteps[0] += 1;
        }
    }   
    return null;
}

function generateKnightsTourSolutionBacktracking(knightGameState) {
    let [kI, kJ] = knightGameState.knightPos;
    let visited = [];
    let backtrackingSteps = [0];
    let tourSteps = [0];
    let step = 1;
    for(let i = 0; i< 8; i++) {
        let copyOfRow = [...knightGameState.boardState[i]];
        visited.push(copyOfRow);
    }
    let next = nextKnightMoves(kI, kJ, 5);
    for (let moveTuple of next) {
        let foundTour = generateKnightsTourSolutionBacktrackingHelper(visited, moveTuple[0], moveTuple[1], step, backtrackingSteps, tourSteps);
        if (foundTour) {
            return foundTour;
        } else {
            visited[8-moveTuple[0]-1][moveTuple[1]] = 0;
            backtrackingSteps[0] += 1;
        }
    }
    return null;
}

function generateTourHelper(visited, i, j, step, backtracking, tourSteps) {
    visited[8-i-1][j] = step;
    tourSteps[0] += 1;
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
        let hasTour = generateTourHelper(visited, mki, mkj, step+1, backtracking, tourSteps);
        if (hasTour) {
            return true;
        } else {
            visited[8-mki-1][mkj] = 0;
            backtracking[0] += 1;
        }
    }
}

function generateKnightsTour(knightGameState) {
    let [kI, kJ] = knightGameState.knightPos;
    let visited = []
    let backtracking = [0];
    let tourSteps = [0];
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
        let foundTour = generateTourHelper(visited, moveTuple[0], moveTuple[1], step, backtracking, tourSteps);
        if (foundTour) {
            console.log(visited);
            return [visited, backtracking, tourSteps];
        } else {
            backtracking[0] += 1;
        }
    }
}

export {generateKnightsTour, generateKnightsTourSolutionBacktracking, heuristic};