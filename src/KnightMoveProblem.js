import {convertStateToFen, copyState, findKnightPos, generateHeatMap, nextKnightMoves, copyBoard} from './KnightMovesChess.js';
import {generateKnightsTour, generateKnightsTourSolutionBacktracking, heuristic} from './KnightsTourChess.js';
import { Chessboard } from 'react-chessboard';
import { useState, useEffect } from 'react';
import $ from 'jquery';
import './KnightMoveProblem.css';

const cols = 'abcdefgh';

const colorScale = [
    "#05803c",
    "#26ad63",
    "#67e09e",
    "#8cf5bb",
    "#b4fad3",
]

function convertSqNotationToIJ(sqNotation) {
    let i = parseInt(sqNotation[1]);
    let j = cols.search(sqNotation[0]);
    return [i-1, j];
}

function convertIJToSqNotation(ijNotation) {
    let [i, j] = ijNotation;
    return cols[j] + (8-i);
}

function renderHeatMap2(heatmap, id) {
    for(let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let ijconverted = convertIJToSqNotation([i, j]);
            $(`div[data-boardid=${id}]`).find(`div[data-square=${ijconverted}] #${ijconverted}`).remove();
        }
    }
    for(let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let ijconverted = convertIJToSqNotation([i, j]);
            if (heatmap[i][j] !== -1) {
                if (heatmap[i][j] !== Infinity) {
                    $(`div[data-boardid=${id}]`).find(`div[data-square=${ijconverted}]`).append(`<div id=${ijconverted} style="z-index: 3;  color: rgb(0, 0, 0); align-self: flex-end; font-size: 10px;">${heatmap[i][j]}</div>`);
                } else {
                    $(`div[data-boardid=${id}]`).find(`div[data-square=${ijconverted}]`).append(`<div id=${ijconverted} style="z-index: 3;  color: rgb(0, 0, 0); align-self: flex-end; font-size: 5.5px;">${heatmap[i][j]}</div>`);
                }
            }
        }
    }
}

function renderTour(tour, id, renderFunc, shouldClearText = true, knightGameState = null) {
    if (shouldClearText) {
        for(let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let ijconverted = convertIJToSqNotation([i, j]);
                $(`div[data-boardid=${id}]`).find(`div[data-square=${ijconverted}] #${ijconverted}`).remove();
            }
        }
    }
    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            let ijconverted = convertIJToSqNotation([i,j]);
            if (tour[i][j] !== -1 && tour[i][j] !== 0) {
                if (renderFunc == null) {
                    $(`div[data-boardid=${id}]`).find(`div[data-square=${ijconverted}]`).append(`<div id=${ijconverted} style="z-index: 3;  color: rgb(0, 0, 0); align-self: flex-end; font-size: 10px;">${tour[i][j]}</div>`);
                } else {
                    renderFunc(id, ijconverted, tour, i, j, knightGameState);
                }
            }
        }
    }
}

function renderHeatMap(heatmap) {
    for(let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let ijconverted = convertIJToSqNotation([i, j]);
            let heatmapLevel = colorScale[heatmap[i][j]];
            // $(`div[data-square=${ijconverted}]`).css('background-color', `${heatmapLevel}`);
            $(`div[data-square=${ijconverted}]`).css('background-color', `${heatmapLevel}`);
        }
    }
}

function initState(kI = 0, kJ = 0) {
    let initialBoardState = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    initialBoardState[kI][kJ] = -1;
    return {
        'boardState': initialBoardState,
        'knightPos': findKnightPos(initialBoardState),
        'nextKnightMoves': [],
        'nextKnightMoveIndex': 0,
        'currentTourStep': 1,
        'visited': copyBoard(initialBoardState),
        'error': null,
        'tourSoFar': [],
        'backtracking': [],
        'stats': {tourSteps: 0, backtrackingSteps: 0},
    }
}

function KnightsTourBacktracking(props) {
    let initialState = initState()
    const [knightGameState, setBoardState] = useState(initialState);
    let convertedFen = convertStateToFen(knightGameState.boardState);
    
    let solve = () => {
        let newKnightGameState = copyState(knightGameState);
        let tourSol = generateKnightsTourSolutionBacktracking(newKnightGameState);
        newKnightGameState.stats = {tourSteps: tourSol.tourSteps, backtrackingSteps: tourSol.backtrackingSteps};
        setBoardState(newKnightGameState);
        if (tourSol) {
            renderTour(tourSol.solution, props.id);
        }
    }
    return (
        <div className = "KnightMoveProblem">
            <button onClick={solve}>solve</button>
            <div>Number of Visits: {knightGameState.stats.tourSteps}</div>
            <div>Number of Backtracks: {knightGameState.stats.backtrackingSteps}</div>
            <Chessboard id={props.id} position={convertedFen} />
        </div>
    )
}

function KnightsTour(props) {
    let initialState = initState()
    const [knightGameState, setBoardState] = useState(initialState);
    let convertedFen = convertStateToFen(knightGameState.boardState);
    
    let pieceDrop = (srcSq, targSq, _p) => {
        let newKnightGameState = copyState(knightGameState);
        let [srcI, srcJ] = convertSqNotationToIJ(srcSq);
        let [targI, targJ] = convertSqNotationToIJ(targSq);
        newKnightGameState.boardState[8-srcI-1][srcJ] = 0;
        newKnightGameState.boardState[8-targI-1][targJ] = -1;
        newKnightGameState.knightPos = [targI, targJ];
        setBoardState(newKnightGameState);
        let tour = generateKnightsTour(newKnightGameState);
        console.log(tour);
        if (tour) {
            renderTour(tour, props.id);
        }
    }
    return (
        <div className = "KnightMoveProblem">
            <Chessboard id={props.id} position={convertedFen} onPieceDrop = {pieceDrop} />
        </div>
    )
}

function InteractiveKnightTourHeuristic(props) {
    // NOTE: Warnsdorff only really works without much backtracking for some squares.
    // Squares in the corner or on the edge give Warnsdorff alot of trouble
    let initialState = initState(3, 3);
    const [knightGameState, setBoardState] = useState(initialState);
    let convertedFen = convertStateToFen(knightGameState.boardState);
    
    // TODO rendering is wonky.
    let nextFunc = () => {
        let newKnightGameState = copyState(knightGameState);
        let [srcI, srcJ] = (newKnightGameState.knightPos);
        // let [targI, targJ] = convertSqNotationToIJ(targSq);
        if (newKnightGameState.currentTourStep === 64) {
            newKnightGameState.error = "SUCCESS! You found a Knights tour!";
            setBoardState(newKnightGameState);
            return;
        }
        let sortedKnightMoves = []
        if (newKnightGameState.nextKnightMoves.length === 0) {
            newKnightGameState.backtracking = [];
            let nextKM = nextKnightMoves(srcI, srcJ);
            let filteredKnightMoves = [];
            for(let knightMove of nextKM) {
                let [targI, targJ] = knightMove;
                let foundInBacktrack = false;
                for(let backTrack of newKnightGameState.backtracking) {
                    if (backTrack[0] === targI && backTrack[1] === targJ) {
                        foundInBacktrack = true;
                    }
                }
                if (newKnightGameState.visited[8-targI-1][targJ] === 0
                    && !foundInBacktrack) {
                    filteredKnightMoves.push([targI, targJ]);
                }
            }
            sortedKnightMoves.push(...filteredKnightMoves.sort((mt1, mt2) => {
                let h1 = heuristic(newKnightGameState.visited, mt1);
                let h2 = heuristic(newKnightGameState.visited, mt2);
                return  h1 - h2;
            }));
        } else {
            sortedKnightMoves.push(...newKnightGameState.nextKnightMoves);
        }
        
        if (newKnightGameState.nextKnightMoves.length === 0) {
            newKnightGameState.tourSoFar.push({
                knightPos: newKnightGameState.knightPos, 
                nextKnightMoves: sortedKnightMoves,
                nextKnightMoveIndex: 0
            });
        }

        if (sortedKnightMoves.length === 0 || (newKnightGameState.nextKnightMoveIndex >= sortedKnightMoves.length)) {
            newKnightGameState.tourSoFar.pop();
            let lastKnightMoveState = newKnightGameState.tourSoFar.pop();
            let [targI, targJ] = lastKnightMoveState.knightPos;

            newKnightGameState.nextKnightMoves = [...lastKnightMoveState.nextKnightMoves];
            newKnightGameState.nextKnightMoveIndex = lastKnightMoveState.nextKnightMoveIndex + 1;
            newKnightGameState.tourSoFar.push({
                knightPos: lastKnightMoveState.knightPos,
                nextKnightMoves: sortedKnightMoves,
                nextKnightMoveIndex: lastKnightMoveState.nextKnightMoveIndex + 1,
            });
            newKnightGameState.boardState[8-srcI-1][srcJ] = 0;
            newKnightGameState.boardState[8-targI-1][targJ] = -1;
            newKnightGameState.visited[8-srcI-1][srcJ] = 0;
            newKnightGameState.currentTourStep -= 1;
            newKnightGameState.knightPos = [targI, targJ];
            newKnightGameState.backtracking.push([srcI, srcJ]);
            renderTour(newKnightGameState.visited, props.id);
            setBoardState(newKnightGameState);
            return;
        }
        let knightMove = sortedKnightMoves[newKnightGameState.nextKnightMoveIndex];
        let [targI, targJ] = knightMove;
        newKnightGameState.boardState[8-srcI-1][srcJ] = 0;
        newKnightGameState.boardState[8-targI-1][targJ] = -1;
        newKnightGameState.visited[8-srcI-1][srcJ] = newKnightGameState.currentTourStep;
        newKnightGameState.knightPos = [targI, targJ];
        newKnightGameState.currentTourStep += 1;
        newKnightGameState.nextKnightMoves = [];
        newKnightGameState.nextKnightMoveIndex = 0;
        renderTour(newKnightGameState.visited, props.id);
        setBoardState(newKnightGameState);
        return;
       
    }
    return (
        <div className = "KnightMoveProblem">
            <div class="ErrorContainer">{knightGameState.error}</div>
            <button onClick={nextFunc}>next</button>
            <Chessboard id={props.id} position={convertedFen} />
        </div>
    )
}

function InteractiveKnightTourBacktracking(props) {
    let initialState = initState()
    const [knightGameState, setBoardState] = useState(initialState);
    let convertedFen = convertStateToFen(knightGameState.boardState);
    
    // TODO rendering is wonky.
    let nextFunc = () => {
        let newKnightGameState = copyState(knightGameState);
        let [srcI, srcJ] = (newKnightGameState.knightPos);
        // let [targI, targJ] = convertSqNotationToIJ(targSq);
        if (newKnightGameState.currentTourStep === 64) {
            newKnightGameState.error = "SUCCESS! You found a Knights tour!";
            setBoardState(newKnightGameState);
            return;
        }
        let sortedKnightMoves = []
        if (newKnightGameState.nextKnightMoves.length === 0) {
            newKnightGameState.backtracking = [];
            let nextKM = nextKnightMoves(srcI, srcJ);
            let filteredKnightMoves = [];
            for(let knightMove of nextKM) {
                let [targI, targJ] = knightMove;
                let foundInBacktrack = false;
                for(let backTrack of newKnightGameState.backtracking) {
                    if (backTrack[0] === targI && backTrack[1] === targJ) {
                        foundInBacktrack = true;
                    }
                }
                if (newKnightGameState.visited[8-targI-1][targJ] === 0
                    && !foundInBacktrack) {
                    filteredKnightMoves.push([targI, targJ]);
                }
            }
            sortedKnightMoves.push(...filteredKnightMoves);
        } else {
            sortedKnightMoves.push(...newKnightGameState.nextKnightMoves);
        }
        
        if (newKnightGameState.nextKnightMoves.length === 0) {
            newKnightGameState.tourSoFar.push({
                knightPos: newKnightGameState.knightPos, 
                nextKnightMoves: sortedKnightMoves,
                nextKnightMoveIndex: 0
            });
        }

        if (sortedKnightMoves.length === 0 || (newKnightGameState.nextKnightMoveIndex >= sortedKnightMoves.length)) {
            newKnightGameState.tourSoFar.pop();
            let lastKnightMoveState = newKnightGameState.tourSoFar.pop();
            let [targI, targJ] = lastKnightMoveState.knightPos;

            newKnightGameState.nextKnightMoves = [...lastKnightMoveState.nextKnightMoves];
            newKnightGameState.nextKnightMoveIndex = lastKnightMoveState.nextKnightMoveIndex + 1;
            newKnightGameState.tourSoFar.push({
                knightPos: lastKnightMoveState.knightPos,
                nextKnightMoves: sortedKnightMoves,
                nextKnightMoveIndex: lastKnightMoveState.nextKnightMoveIndex + 1,
            });
            newKnightGameState.boardState[8-srcI-1][srcJ] = 0;
            newKnightGameState.boardState[8-targI-1][targJ] = -1;
            newKnightGameState.visited[8-srcI-1][srcJ] = 0;
            newKnightGameState.currentTourStep -= 1;
            newKnightGameState.knightPos = [targI, targJ];
            newKnightGameState.backtracking.push([srcI, srcJ]);
            renderTour(newKnightGameState.visited, props.id);
            setBoardState(newKnightGameState);
            return;
        }
        let knightMove = sortedKnightMoves[newKnightGameState.nextKnightMoveIndex];
        let [targI, targJ] = knightMove;
        newKnightGameState.boardState[8-srcI-1][srcJ] = 0;
        newKnightGameState.boardState[8-targI-1][targJ] = -1;
        newKnightGameState.visited[8-srcI-1][srcJ] = newKnightGameState.currentTourStep;
        newKnightGameState.knightPos = [targI, targJ];
        newKnightGameState.currentTourStep += 1;
        newKnightGameState.nextKnightMoves = [];
        newKnightGameState.nextKnightMoveIndex = 0;
        renderTour(newKnightGameState.visited, props.id);
        setBoardState(newKnightGameState);
        return;
    }
    return (
        <div className = "KnightMoveProblem">
            <div class="ErrorContainer">{knightGameState.error}</div>
            <button onClick={nextFunc}>next</button>
            <Chessboard id={props.id} position={convertedFen} />
        </div>
    )
}

function InteractiveKnightTour(props) {
    let initialState = initState()
    const [knightGameState, setBoardState] = useState(initialState);
    let convertedFen = convertStateToFen(knightGameState.boardState);
    
    let pieceDrop = (srcSq, targSq, _p) => {
        let newKnightGameState = copyState(knightGameState);
        let [srcI, srcJ] = convertSqNotationToIJ(srcSq);
        let [targI, targJ] = convertSqNotationToIJ(targSq);
        let nextK = nextKnightMoves(srcI, srcJ);
        let isLegal = false;
        for (let n of nextK) {
            if (n[0] === targI && n[1] === targJ) {
                isLegal = true;
            }
        }
        if (newKnightGameState.visited[8-targI-1][targJ] !== 0) {
            newKnightGameState.error = "ERROR, cannot re-visit a square that has been visited.";
            setBoardState(newKnightGameState);
            return;
        }
        if (!isLegal) {
            newKnightGameState.error = "ERROR, Invalid knight move.";
            setBoardState(newKnightGameState);
            return;
        }
        if (newKnightGameState.currentTourStep === 63) {
            newKnightGameState.error = "SUCCESS! You found a Knights tour!";
            setBoardState(newKnightGameState);
            return;
        }
        newKnightGameState.boardState[8-srcI-1][srcJ] = 0;
        newKnightGameState.boardState[8-targI-1][targJ] = -1;
        newKnightGameState.knightPos = [targI, targJ];
        newKnightGameState.visited[8-srcI-1][srcJ] = newKnightGameState.currentTourStep;
        newKnightGameState.currentTourStep += 1;
        let renderFunc = (boardId, ijconverted, tour, i, j, _nk) => {
            if (tour[i][j] === newKnightGameState.currentTourStep-1) {
                let color = colorScale[Math.floor(Math.random() * colorScale.length)];
                $(`div[data-boardid=${boardId}]`).find(`div[data-square=${ijconverted}]`).css('background-color', `${color}`).append(`<div id=${ijconverted} style="z-index: 3;  color: rgb(0, 0, 0); align-self: flex-end; font-size: 5px;">${tour[i][j]}</div>`);
            }
        }
        renderTour(newKnightGameState.visited, props.id, renderFunc, false);
        setBoardState(newKnightGameState);
    }
    return (
        <div className = "KnightMoveProblem">
            <div class="ErrorContainer">{knightGameState.error}</div>
            <Chessboard id={props.id} position={convertedFen} onPieceDrop = {pieceDrop} />
        </div>
    )
}

function KnightMoveProblem(props) {
    let initialState = initState()
    const [knightGameState, setBoardState] = useState(initialState);
    let convertedFen = convertStateToFen(knightGameState.boardState);
    
    let pieceDrop = (srcSq, targSq, _p) => {
        let newKnightGameState = copyState(knightGameState);
        let [srcI, srcJ] = convertSqNotationToIJ(srcSq);
        let [targI, targJ] = convertSqNotationToIJ(targSq);
        newKnightGameState.boardState[8-srcI-1][srcJ] = 0;
        newKnightGameState.boardState[8-targI-1][targJ] = -1;
        newKnightGameState.knightPos = [targI, targJ];
        setBoardState(newKnightGameState);
        let heatMap = generateHeatMap(newKnightGameState, props.stopAtState);
        renderHeatMap2(heatMap, props.id);
    }
    return (
        <div className = "KnightMoveProblem">
            <Chessboard id={props.id} position={convertedFen} onPieceDrop = {pieceDrop} />
        </div>
    )
}


export { 
    InteractiveKnightTourHeuristic, 
    KnightMoveProblem,
    KnightsTour,
    initState, 
    renderHeatMap2, 
    InteractiveKnightTour, 
    KnightsTourBacktracking, 
    InteractiveKnightTourBacktracking
}