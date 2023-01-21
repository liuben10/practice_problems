import { ContentBox } from './ContentBox.js';
import CodeWindow from 'react-code-window';
import {parse} from 'acorn-loose';
import {full} from 'acorn-walk';
import './InteractiveCodeWindow.css';
import { StateRenderer } from './StateRenderer.js';
import { initState } from './KnightMoveProblem.js';
import { useState } from 'react';
import { traverse, Visitor } from './Visitor.js';
import reactStringReplace from 'react-string-replace';

function parseCodeIntoAst(code) {
    return parse(code, {ecmaVersion: 2020});
}

const simpleTestCode = `
    console.log('hello');
    let x = 3;
    let y = 4;
    let z = x + y;
    return z;
`

const forLoopExample = `
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
`


const knightHeatMapCode = `
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
`

function splits(code, start, end) {
    let codeSplit = [code.substring(0, start+1), code.substring(start, end), code.substring(end)];
    let replaceWithJsx = codeSplit[1];
    return reactStringReplace(code, replaceWithJsx, (match, _i) => {
        return <mark>{match}</mark>
    });
}

function HighlightableCodeBloc(props) {
    let [highlightState, setHighlightState] = useState(props.state ?? {});
    let startLine = props.startLine;
    let endLine = props.endLine;
    
    let codeSplit = splits(props.code, startLine, endLine);
    console.log(codeSplit);
    return <div>{codeSplit.map((d, _idx) => d)}</div>;
}

function CodeEditor(props) {
    let [programState, setTraversalState] = useState(props.state ?? {});
    let code = forLoopExample;
    let ast = parseCodeIntoAst(code);
    console.log(ast);
    traverse(ast, {pc_start: 0, pc_end: 0, loops: []}, {});
    let codeWindow = <div ><HighlightableCodeBloc code={code} startLine={0} endLine={4} /></div>
    return <div>{codeWindow}</div>;
  }

  function InteractiveCodeWindow() {
    return <div className="InteractiveCodeWindow"><div>{CodeEditor({})}</div><StateRenderer state={initState()} /></div>;
  }

  

  export {InteractiveCodeWindow};