import { KnightMoveProblem } from './KnightMoveProblem.js'
import './App.css';
import {ProblemDemo} from './ProblemDemo.js';
import {ContentBox} from './ContentBox.js';
import { InteractiveCodeWindow, CodeDebugger } from './InteractiveCodeWindow.js';
import { Provider } from 'react-redux';
import knightStore from './knightStore';

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
  return <Provider store={knightStore}><ContentBox content={<CodeDebugger />} /></Provider>;
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
