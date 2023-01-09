import { ContentBox } from './ContentBox.js';
import CodeWindow from 'react-code-window';
import {parse} from 'acorn-loose';
import {full} from 'acorn-walk';
import './InteractiveCodeWindow.css'

function parseCodeIntoAst(code) {
    return parse(code, {ecmaVersion: 2020});
}

function codeEditor() {
    let code = `
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
    `;
    let ast = parseCodeIntoAst(code);
    full(ast, (node) => {console.log(`Type: ${node.type}. START AND END. ${node.start}. ${node.end}`)});
    console.log(ast);
    return <div><CodeWindow width="70%">{code}</CodeWindow></div>;
  }

  function InteractiveCodeWindow() {
    return <div className="InteractiveCodeWindow"><div>{codeEditor()}</div><div>Hi</div></div>;
  }

  

  export {InteractiveCodeWindow};