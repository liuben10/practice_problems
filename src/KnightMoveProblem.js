import {convertStateToFen, copyState, findKnightPos, generateHeatMap, nextKnightMoves, copyBoard} from './KnightMovesChess.js';
import {generateKnightsTour, generateKnightsTourSolutionBacktracking, heuristic} from './KnightsTourChess.js';
import { Chessboard } from 'react-chessboard';
import { useState, useEffect } from 'react';
import $, { map } from 'jquery';
import './KnightMoveProblem.css';

const cols = 'abcdefgh';

const colorScale = [
    "rgb(66, 135, 245)", // blue
    "rgb(18, 99, 57)", // green
    "rgb(222, 112, 255)", // pink
];
let black = "rgb(181, 136, 99)";
let white = "rgb(240, 217, 181)";
let backtrackingColor = "rgb(252, 44, 3)";

function convertSqNotationToIJ(sqNotation) {
    let i = parseInt(sqNotation[1]);
    let j = cols.search(sqNotation[0]);
    return [i-1, j];
}

function isSquareWhite(sI, sJ) {
    let sCI = 8 - sI - 1;
    return (sCI % 2 === 0 && sJ % 2 === 0) ||
    (sCI % 2 === 1 && sJ % 2 === 1);
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

function clearNumber(id, kI, kJ) {
    let ijconverted = convertIJToSqNotation([8-kI-1,kJ]);
    $(`div[data-boardid=${id}]`).find(`div[data-square=${ijconverted}] #${ijconverted}`).remove();
}

function renderHeuristic(id, kI, kJ, knightGameState) {
    clearHeuristicFromKnightState(id, knightGameState);
    let nextKM = nextKnightMoves(kI, kJ);
    nextKM.forEach((mt, idx) => {
        let h = heuristic(knightGameState.visited, mt);
        renderNumberOnSquare(id, mt[0], mt[1], h);
    });
}

function clearHeuristic(id, kI, kJ, knightGameState) {
    let nextKM = nextKnightMoves(kI, kJ);
    nextKM.forEach((mt, idx) => {
        clearNumber(id, mt[0], mt[1]);
    });
}

function clearStyle(id, kI, kJ) {
    let ijconverted = convertIJToSqNotation([8-kI-1,kJ]);
    $(`div[data-boardid=${id}]`).find(`div[data-square=${ijconverted}] #${ijconverted}`).remove();
    let color = black;
    if (isSquareWhite(kI, kJ)) {
        color = white;
    }
    $(`div[data-boardid=${id}]`).find(`div[data-square=${ijconverted}]`).css('background-color', color);
}

function clearAll(id) {
    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            clearHeuristic(id, i, j);
            clearStyle(id, i, j);
        }
    }
}

function renderNumberOnSquare(id, kI, kJ, value) {
    let ijconverted = convertIJToSqNotation([8-kI-1,kJ]);
    $(`div[data-boardid=${id}]`).find(`div[data-square=${ijconverted}] #${ijconverted}`).remove();
    $(`div[data-boardid=${id}]`).find(`div[data-square=${ijconverted}]`).append(`<div id=${ijconverted} style="z-index: 3; color: rgb(0, 0, 0); align-self: flex-end; font-size: 10px;">${value}</div>`);
 
}

function renderMove(id, kI, kJ, knightGameState) {
    renderNumberOnSquare(id, kI, kJ, knightGameState.currentTourStep);
}

function clearHeuristicFromKnightState(id, knightGameState) {
    let clearHeuristicPos = knightGameState.knightPos;
    if (knightGameState.tourSoFar.length > 0) {
        let lastKnightState = knightGameState.tourSoFar[knightGameState.tourSoFar.length-1];
        clearHeuristicPos = lastKnightState.knightPos;
    }
    let lastKM = nextKnightMoves(clearHeuristicPos[0], clearHeuristicPos[1]);
    for(let [lastI, lastJ] of lastKM) {
        clearNumber(id, lastI, lastJ);
    }
}

function renderMoveColorScale(id, kI, kJ, knightGameState) {
    let ijconverted = convertIJToSqNotation([8-kI-1,kJ]);
    let colorScaleIdx = knightGameState.currentTourStep % colorScale.length;
    $(`div[data-boardid=${id}]`).find(`div[data-square=${ijconverted}]`).css('background-color', colorScale[colorScaleIdx]);
    clearHeuristicFromKnightState(id, knightGameState);
}

function renderBacktracking(id, kI, kJ, knightGameState) {
    let ijconverted = convertIJToSqNotation([8-kI-1,kJ]);
    $(`div[data-boardid=${id}]`).find(`div[data-square=${ijconverted}] #${ijconverted}`).remove();
    $(`div[data-boardid=${id}]`).find(`div[data-square=${ijconverted}]`).css('background-color', backtrackingColor);    
}

function clearBacktracking(id, knightGameState) {
    for(let moveTup of knightGameState.backtracking) {
        let [bI, bJ] = moveTup;
        let ijconverted = convertIJToSqNotation([8-bI-1,bJ]);
        let color = black;
        if (isSquareWhite(bI, bJ)) {
            color = white;
        }
        $(`div[data-boardid=${id}]`).find(`div[data-square=${ijconverted}]`).css('background-color', color);
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
                    $(`div[data-boardid=${id}]`).find(`div[data-square=${ijconverted}]`).append(`<div id=${ijconverted} style="z-index: 3; color: rgb(0, 0, 0); align-self: flex-end; font-size: 10px;">${tour[i][j]}</div>`);
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
        'tried': [],
    }
}

function KnightsTourBacktracking(props) {
    let initialState = initState(6, 2)
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
        let [tour, backtracking, tourSteps] = generateKnightsTour(newKnightGameState);
        console.log(tour);
        if (tour) {
            renderTour(tour, props.id);
        }
        newKnightGameState.stats.tourSteps = tourSteps[0];
        newKnightGameState.stats.backtrackingSteps = backtracking[0];
        setBoardState(newKnightGameState);
    }
    return (
        <div className = "KnightMoveProblem">
            <div>Number of Visits: {knightGameState.stats.tourSteps}</div>
            <div>Number of Backtracks: {knightGameState.stats.backtrackingSteps}</div>
            <Chessboard id={props.id} position={convertedFen} onPieceDrop = {pieceDrop} />
        </div>
    )
}

function pieceDropFactory(id, setBoardStateFunc) {
    let pieceDrop = (srcSq, targSq, _p) => {
        let [targI, targJ] = convertSqNotationToIJ(targSq);
        let newState = initState(8-targI-1, targJ);
        setBoardStateFunc(newState)
        clearAll(id);
    }
    return pieceDrop;       
}

function isMoveInList(move, collection) {
    for(let tuple of collection) {
        if (move[0] === tuple[0] && move[1] === tuple[1]) {
            return true;
        }
    };
    return false;
}

function InteractiveKnightTourHeuristic(props) {
    // NOTE: Warnsdorff only really works without much backtracking for some squares.
    // Squares in the corner or on the edge give Warnsdorff alot of trouble
    let initialState = initState(3, 3);
    const [knightGameState, setBoardState] = useState(initialState);
    let convertedFen = convertStateToFen(knightGameState.boardState);
    
    let showHeuristic = () => {
        let [srcI, srcJ] = (knightGameState.knightPos);
        renderHeuristic(props.id, srcI, srcJ, knightGameState);
    }
    // TODO rendering is wonky.
    let nextFunc = () => {
        let newKnightGameState = copyState(knightGameState);
        let [srcI, srcJ] = (newKnightGameState.knightPos);
        renderMoveColorScale(props.id, srcI, srcJ, newKnightGameState);
        // let [targI, targJ] = convertSqNotationToIJ(targSq);
        if (newKnightGameState.currentTourStep === 64) {
            newKnightGameState.error = "SUCCESS! You found a Knights tour!";
            setBoardState(newKnightGameState);
            return;
        }
        let nextKM = nextKnightMoves(srcI, srcJ);
        let minHeuristicAndMove = [Infinity, null];
        nextKM.forEach( (knightMove) => {
            if (newKnightGameState.visited[8-knightMove[0]-1][knightMove[1]] === 0
                && !isMoveInList(knightMove, newKnightGameState.tried)) {
                let h = heuristic(newKnightGameState.visited, knightMove);
                if (h < minHeuristicAndMove[0]) {
                    minHeuristicAndMove = [h, knightMove];
                }
            }
        });

        newKnightGameState.tourSoFar.push({
            knightPos: newKnightGameState.knightPos, 
            nextKnightMoves: nextKM,
            tried: newKnightGameState.tried,
            currentTourStep: newKnightGameState.currentTourStep,
        });

        if ((minHeuristicAndMove[1] == null) || (newKnightGameState.tried.length >= nextKM.length)) {
            let attemptState = newKnightGameState.tourSoFar.pop();
            let lastKnightMoveState = newKnightGameState.tourSoFar.pop();
            let [targI, targJ] = lastKnightMoveState.knightPos;

            newKnightGameState.nextKnightMoves = [...lastKnightMoveState.nextKnightMoves];
            newKnightGameState.currentTourStep = lastKnightMoveState.currentTourStep;
            newKnightGameState.boardState[8-srcI-1][srcJ] = 0;
            newKnightGameState.boardState[8-targI-1][targJ] = -1;
            newKnightGameState.visited[8-srcI-1][srcJ] = 0;
            newKnightGameState.knightPos = [targI, targJ];
            newKnightGameState.backtracking.push([srcI, srcJ]);
            newKnightGameState.tried = [...lastKnightMoveState.tried];
            newKnightGameState.tried.push(attemptState.knightPos)
            renderBacktracking(props.id, srcI, srcJ, newKnightGameState);
            setBoardState(newKnightGameState);
            return;
        }
        clearBacktracking(props.id, newKnightGameState);
        newKnightGameState.backtracking = [];
        let [targI, targJ] = minHeuristicAndMove[1];
        newKnightGameState.boardState[8-srcI-1][srcJ] = 0;
        newKnightGameState.boardState[8-targI-1][targJ] = -1;
        newKnightGameState.visited[8-srcI-1][srcJ] = newKnightGameState.currentTourStep;
        newKnightGameState.knightPos = [targI, targJ];
        newKnightGameState.currentTourStep += 1;
        newKnightGameState.nextKnightMoves = [];
        newKnightGameState.nextKnightMoveIndex = 0;
        newKnightGameState.tried = [];
        setBoardState(newKnightGameState);
        return;
    }
    return (
        <div className = "KnightMoveProblem">
            <div class="ErrorContainer">{knightGameState.error}</div>
            <button onClick={showHeuristic}>show</button>
            <button onClick={nextFunc}>next</button>
            <Chessboard id={props.id} position={convertedFen} onPieceDrop={pieceDropFactory(props.id, setBoardState)}/>
        </div>
    )
}


function InteractiveKnightTourBacktracking(props) {
    let initialState = initState()
    const [knightGameState, setBoardState] = useState(initialState);
    let convertedFen = convertStateToFen(knightGameState.boardState);
    
    let nextFunc = () => {
        let newKnightGameState = copyState(knightGameState);
        let [srcI, srcJ] = (newKnightGameState.knightPos);
        renderMove(props.id, srcI, srcJ, newKnightGameState);
        // let [targI, targJ] = convertSqNotationToIJ(targSq);
        if (newKnightGameState.currentTourStep === 64) {
            newKnightGameState.error = "SUCCESS! You found a Knights tour!";
            setBoardState(newKnightGameState);
            return;
        }
        let nextKM = nextKnightMoves(srcI, srcJ);
        let knightMove = nextKM[newKnightGameState.nextKnightMoveIndex];
        while(newKnightGameState.nextKnightMoveIndex < nextKM.length && newKnightGameState.visited[8-knightMove[0]-1][knightMove[1]] !== 0) {
            newKnightGameState.nextKnightMoveIndex += 1;
            knightMove = nextKM[newKnightGameState.nextKnightMoveIndex];
        }

        newKnightGameState.tourSoFar.push({
            knightPos: newKnightGameState.knightPos, 
            nextKnightMoves: nextKM,
            nextKnightMoveIndex: newKnightGameState.nextKnightMoveIndex,
            currentTourStep: newKnightGameState.currentTourStep,
        });

        if ((newKnightGameState.nextKnightMoveIndex >= nextKM.length)) {
            newKnightGameState.tourSoFar.pop();
            let lastKnightMoveState = newKnightGameState.tourSoFar.pop();
            let [targI, targJ] = lastKnightMoveState.knightPos;

            newKnightGameState.nextKnightMoves = [...lastKnightMoveState.nextKnightMoves];
            newKnightGameState.nextKnightMoveIndex = lastKnightMoveState.nextKnightMoveIndex + 1;
            newKnightGameState.currentTourStep = lastKnightMoveState.currentTourStep;
            newKnightGameState.boardState[8-srcI-1][srcJ] = 0;
            newKnightGameState.boardState[8-targI-1][targJ] = -1;
            newKnightGameState.visited[8-srcI-1][srcJ] = 0;
            newKnightGameState.knightPos = [targI, targJ];
            newKnightGameState.backtracking.push([srcI, srcJ]);
            renderBacktracking(props.id, srcI, srcJ, newKnightGameState);
            setBoardState(newKnightGameState);
            return;
        }
        clearBacktracking(props.id, newKnightGameState);
        newKnightGameState.backtracking = [];
        let [targI, targJ] = knightMove;
        newKnightGameState.boardState[8-srcI-1][srcJ] = 0;
        newKnightGameState.boardState[8-targI-1][targJ] = -1;
        newKnightGameState.visited[8-srcI-1][srcJ] = newKnightGameState.currentTourStep;
        newKnightGameState.knightPos = [targI, targJ];
        newKnightGameState.currentTourStep += 1;
        newKnightGameState.nextKnightMoves = [];
        newKnightGameState.nextKnightMoveIndex = 0;

        setBoardState(newKnightGameState);
        return;
    }
    return (
        <div className = "KnightMoveProblem">
            <div class="ErrorContainer">{knightGameState.error}</div>
            <button onClick={nextFunc}>next</button>
            <Chessboard id={props.id} position={convertedFen} onPieceDrop={pieceDropFactory(props.id, setBoardState)} />
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