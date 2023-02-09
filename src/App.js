import { KnightMoveProblem, KnightsTour} from './KnightMoveProblem.js'
import './App.css';
import './KnightMoveImage.css';
import {ProblemDemo} from './ProblemDemo.js';
import {ContentBox} from './ContentBox.js';
import { InteractiveCodeWindow, CodeDebugger } from './InteractiveCodeWindow.js';
import { Provider } from 'react-redux';
import knightStore from './knightStore';

function heatMap(stopAtState, id) {
  return <ContentBox content={<KnightMoveProblem stopAtState={stopAtState} id={id} />} />
}
function title() {
  return <ContentBox content={
    <h1>How does a knight move</h1>
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

// TODO replace with code window explanation
function explanationP2() {
  return <ContentBox content={
    `
     In other words, we can describe the algorithm with this pseudocode.

     Initialize board with all zeroes
     explore each of the nearest knight moves by assigning weights to each nearest first.
     if each of the nearest knight moves can already have been reached by a shorter path, skip.
       if not, continue exploring.
     if there are no moves to explore. End.
    `
  } />
}

function explanationP3() {
  return <ContentBox content={
    `
     This is the state of the board after initializing to all Infinity
    `
  } />
}

function explanationP4() {
  return <ContentBox content={
    `
     This is the state of the board after taking the first knight step.
    `
  } />
}

function explanationP5() {
  return <ContentBox content={
    `
     This is the state of the board after a conflict occurs when a knight sees a shorter path to a previously explored path
    `
  } />
}

function explanationP6() {
  return <ContentBox content={
    `
     This is the kngihts tour problem
    `
  } />
}

function knightMoveImage() {
  return (<ContentBox content={
    <img className="KnightMoveImage" src="./knight_move.png"/>
  } />);
}

function codeWindow() {
  return <Provider store={knightStore}><ContentBox content={<CodeDebugger />} /></Provider>;
}

function knightsTour() {
  return (<ContentBox content={
    <KnightsTour id="knightsTour" />
  }/>);
}

function getChessProblemArticle() {
  return [
    title(),
    problemDescription(),
    knightMoveImage(),
    explanationP1(),
    explanationP2(),
    heatMap("initHeatMap", "initBoard"),
    explanationP3(),
    heatMap("firstKnightStep", "firstKnightStepBoard"),
    explanationP4(),
    heatMap("foundShorterPath", "shorterPathBoard"),
    explanationP5(),
    // codeWindow(),
    heatMap("full", "finalBoard"),
    explanationP6(),
    knightsTour(),
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
