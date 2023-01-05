import { KnightMoveProblem } from './KnightMoveProblem.js'
import './App.css';
import {ProblemDemo} from './ProblemDemo.js';
import { ContentBox } from './ContentBox.js';
import CodeWindow from 'react-code-window';

function heatMap() {
  return <ContentBox content={<KnightMoveProblem />} />
}
function title() {
  return <ContentBox content={
    <h1>A Knights Tour</h1>
  } />;
}
function problemDescription() {
  return <ContentBox content={
    `In this problem, you are given a knight and must calculate 
    for each square and a given knight's position the minimum of steps required for
    the knight to reach the square.
    `
  } />
}
function explanationP1() {
  // TODO improve this explanation.
  return <ContentBox content={
    `This problem is a classic example of a graph search type problem.
    In this example, I will utilize Dijkstra's algorithm to compute the minimum distances to reach each square on
    an 8x8 chessboard.

    Dijkstra's algorithm works by initializing all of the 'minimum distances' for the knight and then
    iterating through each of a node's neighbors, updating distances if the current saved distance on a square
    is greater than the distance that will be reached in the current traversal.
    `
  } />
};

function codeWindow() {
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
  return <ContentBox content={<CodeWindow width="100%">{code}</CodeWindow>} />;
}

function getChessProblemArticle() {
  return [
    title(),
    problemDescription(),
    explanationP1(),
    codeWindow(),
    heatMap(),
  ]
}

function App() {
  return (
    <div className="App">
      <ProblemDemo innerContent={[getChessProblemArticle()]} />
    </div>
  );
}

export default App;
