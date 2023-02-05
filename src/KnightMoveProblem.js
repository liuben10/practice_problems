import {convertStateToFen, copyState, findKnightPos, generateHeatMap} from './KnightMovesChess.js';
import {generateKnightsTour} from './KnightsTourChess.js';
import { Chessboard } from 'react-chessboard';
import { useState, useEffect } from 'react';
import $ from 'jquery';
import './KnightMoveProblem.css';

const cols = 'abcdefgh';

const colorScale = [
    "#000000",
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

function initState() {
    let initialBoardState = [
        [-1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    return {
        'boardState': initialBoardState,
        'knightPos': findKnightPos(initialBoardState),
    }
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
    }
    return (
        <div className = "KnightTourProblem">
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


export { KnightMoveProblem, KnightsTour, initState, renderHeatMap2}