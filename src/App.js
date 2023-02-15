import { KnightMoveProblem, KnightsTour, KnightsTourBacktracking, InteractiveKnightTour, InteractiveKnightTourBacktracking, InteractiveKnightTourHeuristic} from './KnightMoveProblem.js'
import './App.css';
import './KnightMoveImage.css';
import {ProblemDemo} from './ProblemDemo.js';
import {ContentBox} from './ContentBox.js';
import { InteractiveCodeWindow, CodeDebugger, HighlightableCodeBloc} from './InteractiveCodeWindow.js';
import { Provider } from 'react-redux';
import knightStore from './knightStore';

function heatMap(stopAtState, id) {
  return <ContentBox content={<KnightMoveProblem stopAtState={stopAtState} id={id} />} />
}
function H1(text) {
  return <ContentBox content={
    <h1>{text}</h1>
  } />;
}
function H2(text) {
  return <ContentBox content={
    <h2>{text}</h2>
  } />;
}
function H3(text) {
  return <ContentBox content={
    <h3>{text}</h3>
  } />;
}
function paragraph(text) {
  return <ContentBox content={text} />
}
function fibonacci(startline = 0, endline = 0) {
  let fibonacci = `
  function fib(n) {
    if (n <= 1) {
      return 1;
    } else {
      return fib(n-1) + fib(n-2);
    }
  }
  `;
  return <ContentBox content={
    <HighlightableCodeBloc code={fibonacci} startLine={startline} endLine={endline} />
  } />
}
function backTrackingPseudoCode() {
  let backtrackingPseudocode = `    
    Given that I am at a particular square on the chessboard.

    Mark my current path that I have travelled so far.

    If I am able to still visit a path, visit it.

    Otherwise, I need to look back at my journey so far,
    and then keep going backwards until I reach a part of my journey
    where there are still more paths to travel down.
  `
  return <ContentBox content={
    <HighlightableCodeBloc code={backtrackingPseudocode} startLine={0} endLine={0} />
  } />
}
function fibonacci4() {
  let fibonacci4 = `
    fib(4)
    => fib(3) + fib(2)
    => fib(2) + fib(1) + fib(1) + fib(0)
    => fib(1)=1 + fib(0)=1 + fib(1)=1 + fib(1)=1 + fib(0)=1 == 5

  i:        0, 1, 2, 3, 4
  fib(i):   1, 1, 2, 3, 5
  `
  return <ContentBox content={
    <HighlightableCodeBloc code={fibonacci4} startLine={0} endLine={0} />
  } />
}

function knightMoveImage() {
  return (<ContentBox content={
    <img className="KnightMoveImage" src="./knight_move.png"/>
  } />);
}

function knightsTourGraph() {
  return (<ContentBox content={
    <img className="KnightMoveImage" src="./knights_move_graph.png"/>
  } />);
}

function socialNetworkGraph() {
  return (<ContentBox content={
    <img className="KnightMoveImage" src="./social_network.jpg"/>
  } />);
}
function hanselAndGretelImage() {
  return (<ContentBox content={
    <img className="KnightMoveImage" src="./HanselandGretelCropped.png"/>
  } />);
}

function codeWindow() {
  return <Provider store={knightStore}><ContentBox content={<CodeDebugger />} /></Provider>;
}

function interactiveBacktracking() {
  return <ContentBox content={
    <InteractiveKnightTourBacktracking id="interactiveBacktrackingKnightsTour" />
  } />;
}

function interactiveTour() {
  return (<ContentBox content={
    <InteractiveKnightTour id="interactiveKnightsTour" />
  } v/>);
}

function knightsTourBacktracking() {
  return (<ContentBox content={
    <KnightsTourBacktracking id="knightsTourBacktracking" />
  }/>)
}

function interactiveKnightsTourHeuristic() {
  return (<ContentBox content={
    <InteractiveKnightTourHeuristic id="interactiveHeuristicKnightsTour" />
  }/>);
}

function knightsTour() {
  return (<ContentBox content={
    <KnightsTour id="knightsTour" />
  }/>);
}

function getChessProblemArticle() {
  return [
    H1("A Knight's Tour"),
    H2(`Motivation`),
    paragraph(`The Knight's Tour problem is one of the most famous problems in Computer Science 
    and has been intensely studied by some of the greatest mathematical minds of all time
    including Leonard Euler. It was first mentioned in the 9th century AD in Sanskrit poetry in Rudrata's Kavyalankara where
    the author prescribed a way to use a knight's tour to write out the syllables of a poem. It was later more thoroughly studied and in the 18th century and is still studied to this very day.`),
    H2(`Introduction`),
    paragraph(`A knight is a specific piece in the game of Chess. It can only move'
    two steps in one direction and one step perpendicular to the direction it just moved in.`),
    paragraph(`Here's a graphic capturing this`),
    knightMoveImage(),
    paragraph(`The important thing is that at most, a knight can only move to up to 8 squares, although you will notice that as the knight moves
    closer to the edge, it will get less moves. This is because in the game of Chess, you cannot move over the edge. (Chess is not played on an infinite board).`),
    H2(`Problem`),
    paragraph(`"I found myself one day in company where, on the occasion of a game of chess, someone proposed this question: to traverse with a knight all the cells of the chessboard, without ever arriving twice at the same, and commencing from a given cell." -- Leonard Euler`),
    paragraph(`Or in plainer english, given a knight on a board, try to construct a tour that will visit every square on a chessboard without retracing steps`),
    interactiveTour(),
    paragraph(`For a human, this problem seems tricky because we can easily trap our own knight if not careful.`),
    paragraph(`If we just look at the possible knight moves on the first move, there's at most 8 possible moves on the first move.
    Then on the second move, there can be at most 7 possible moves, then potentially 7 again, so on and so forth... In other words, as my knights journey gets longer, there 
    becomes an exponentially increasing amount of possible journeys my knight can take relative to the length of my journey.`),
    paragraph(`So how can we produce a tour?`),
    H2(`Terminology`),
    H3(`Algorithm`),
    paragraph('An algorithm is a sequence of statements and expressions used for problem-solving.'),
    paragraph(`Algorithms are agnostic to computing devices, in other words, we have had algorithms long before we ever had digital computers.
    We have found algorithms for finding knights tours since the 19th century.`),
    paragraph(`An example of an 
    algorithm to compute 
    the n'th term of the Fibonacci Sequence.`),
    paragraph(` A refresher on the Fibonacci sequence. It
     is defined as such: The nth term in the sequence is the
      sum of the n-1 and the n-2 term in the same sequence, starting at 1. 
      The first few terms of the sequence when enumerated is 1,1,2,3,5,8...`),
    fibonacci(),
    paragraph(`To understand how this algorithm works, basically,
     the first line defines that we are declaring a function
      which will take as input 'n'. In this case, n is a number.`),
    fibonacci(0, 18),
    paragraph(`The second line defines something called an 'if' statement. It basically means evaluate whatever is the argument to 'if' which is the second chunk and see if it returns true or false. If it returns true, go into the first chunk, if it returns false, go into the chunk after the 'else'`),
    fibonacci(23, 36),
    paragraph(`When we evaluate the if statement and the first element is true, we go into the first if block and return 1.`),
    fibonacci(45, 53),
    paragraph(`When we evalute the if statement and the condition is false. We will go into the second chunk`),
    fibonacci(67, 102),
    paragraph(`This is an example of what is known as recursion. Recursion 
    is the process with which a function will refer back to its original
     function call except with a different input that is usually
      a sub-problem of the original input.`),
    paragraph(`Recursion is a useful technique because
    it greatly simplifies some problems that 
    naturally have sub-problems that are identical to the original problem but with different inputs. In the case of
    fibonacci, this makes sense because the definition of the 'n'th term is defined as a sum of the n-1th and n-2th term.
    i.e. n-1 and n-2 terms are just other subproblems in the fibonacci sequence.`),
    paragraph(`To illustrate how this works in practice, take the example of fib(4)`),
    fibonacci4(),
    H3('Data Structures'),
    paragraph(`Data Structures are ways for us to represent complicated problems as objects
    that can be recognized by a program.`),
    paragraph(`In a Knight's tour, the data-structure we will use to represent a Knight's tour is called a 'Graph'`),
    paragraph(`A Graph is basically a structure that represents the relationships between 'nodes' using 'edges'.
    This is a very general definition as many things can be represented as a graph.
    For instance, a social network is a graph because we can represent nodes as 'people' and edges as 'relationships' between people.`),
    socialNetworkGraph(),
    paragraph(`Think about how we can represent a chessboard with a knight as a graph.`),
    knightsTourGraph(),
    paragraph(`In the above image, the nodes are the squares of the chessboard. 
    And the possible squares that the knight can reach in one move from a square are the edges.
    The numbers on the nodes represent how many possible moves the knight has. i.e. when the knight is on the corner, 
    it only has 2 moves whereas when it's in the center, it has 8 moves.`),
    paragraph(`Armed with this, we can begin thinking about solutions that utilize the fact that this is a graph datastructure.`),
    // TODO add image of a knights tour graph
    H2(`Backtracking`),
    paragraph(`Backtracking is an approach for potentially solving this problem.`),
    paragraph(`Imagine if you were a person lost in the woods. You want to find the path out of the woods.
    How could you find a way out of the woods? You could think about just looking at all of your neighboring squares,
    and then visiting the nearest neighbor. However, can you think of a problem with this approach?
    `),
    paragraph(`If you just visit your neighboring squares, you ultimately will just end back to where you are! How can we avoid
    revisiting where we are?`),
    hanselAndGretelImage(),
    paragraph(`We have to mark where we are going! When we run into a dead end, we have to un-visit the node
    and then back up and try another path.`),
    paragraph(` To describe this in pseudocode, (n\ot real code but logically captures what is happening), we can
    very succinctly represent the logic as this.`),
    backTrackingPseudoCode(),
    interactiveBacktracking(),
    paragraph(`As you might notice, the naive backtracking approach takes extremely long. The reason why is because the number of
    times you have to visit a square grows exponentially as well as the amount of backtracking that you must perform. 
    
    In fact, there are roughly 4^51 possible different move sequences on an 8x8 board so this is far too intractable to just solve naively.`),
    paragraph(`However, we can use backtracking to solve for a smaller board. Below, I have an implementation using backtracking for a 6x6 board.
    This is a much more reasonable problem because there's only 6,637,920 directed closed tours on a 6x6 board rather than 19 quintrillion closed directed tours`),
    paragraph(`Backtracking is a useful technique to know for solving certain problems such as Sudoku, or 
    CSP type problems during leetcode interviews. In practicality, we don't utilize backtracking so much (or at least we would
      use more advanced techniques such as arc consistency to prune some of our backtracking)`),
    knightsTourBacktracking(),
    H2(`Warnsdorff - A Remarkably good heuristic.`),
    paragraph(`One technique we can use to prune the search space would be to use something called a heuristic to evaluate the possible
    moves, and choose the best move in our current situation.
    
    A heuristic is a type of function that takes children states (in each case, every next move), and produces a score (just a number).
    The algorithm uses the heurstic to determine without traversing any particular path, which route best to take. This technique
    is oftentimes used in chess engines for determining what are the best moves. It is very powerful since it can essentially
    cut down a ton of backtracking for us.`),
    interactiveKnightsTourHeuristic(),
    paragraph(`Note that while this may work for some instances, it actually still fails for some other squares where we could run into
    situations where we may have to revert back to backtracking. In this case, it is hard to determine whether or not Warnsdorff will always
    give us a solution. This problem of determining if there was a way to predict whether or not a program will halt or not, is a very interesting 
    topic in Computer Science but essentially, it is indeterminable.`),
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
