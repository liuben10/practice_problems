import {parse} from 'acorn-loose';
import {full} from 'acorn-walk';
import './InteractiveCodeWindow.css';
import { StateRenderer } from './StateRenderer.js';
import { initState } from './KnightMoveProblem.js';
import { useState, useEffect } from 'react';
import { traverse, Visitor } from './Visitor.js';
import reactStringReplace from 'react-string-replace';
import './HighlightableCodeBlock.css';
import { useSelector, useDispatch} from 'react-redux';
import  {next, play, reset, parseAst} from './knightStoreSlice.js';

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
    let startLine = props.startLine;
    let endLine = props.endLine;
    let codeSplit = splits(props.code, startLine, endLine);
    return <code className="HighlightableCodeBlock">{codeSplit.map((d, _idx) => d)}</code>;
}

function CodeEditor(props) {
    const dispatch = useDispatch();
    let programCounter = useSelector((state) => {
        return state.knightStore.programCounter;
    });
    useEffect(() => {
        let execNode = props.exec[programCounter];
        if (execNode.resetProgramCounter) {
            dispatch(next(execNode.resetProgramCounter));
        }
    });
    let codeWindow = <div ><HighlightableCodeBloc code={props.code} startLine={
        programCounter < props.exec.length ? props.exec[programCounter].start : props.exec[props.exec.length-1].start
    } endLine={
        programCounter < props.exec.length ? props.exec[programCounter].end : props.exec[props.exec.length-1].end
    } /></div>
    return <div>{codeWindow}</div>;
}

  function InteractiveCodeWindow(props) {
    return <div className="InteractiveCodeWindow"><CodeEditor code={props.code} exec={props.exec} programState={props.programState} /><StateRenderer state={initState()} /></div>;
  }

  function CodeDebugger() {
    const dispatch = useDispatch();
    let code = forLoopExample;
    let ast = parseCodeIntoAst(code);
    let [programState, setProgramState] = useState(initState);
    let programCounter = useSelector((state) => {
        return state.knightStore.programCounter;
    });
    console.log(ast);
    let traversal = []
    let v = new Visitor(traversal);
    traverse(ast, v);
    let resetButton = () => {
        dispatch(reset());
    };
    let nextButton = () => {
        if (programCounter < v.traversal.length) {
            dispatch(next())
        }
    };
    return (<div><InteractiveCodeWindow code={code} exec={v.traversal} programState={programState} />
            <button onClick={resetButton}>reset</button>
            <button onClick={nextButton}>next</button>
        </div>);

  }

  export {InteractiveCodeWindow, CodeDebugger};