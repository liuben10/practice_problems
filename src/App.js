import { KnightMoveProblem, KnightsTour, KnightsTourBacktracking, InteractiveKnightTour, InteractiveKnightTourBacktracking, InteractiveKnightTourHeuristic} from './KnightMoveProblem.js'
import './App.css';
import './KnightMoveImage.css';
import {ProblemDemo} from './ProblemDemo.js';
import {ContentBox} from './ContentBox.js';
import { useState, useEffect } from 'react';
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
    Create an empty chess board. (We will be using this chess board to mark which squares we have visited. This chess board will have no squares marked at first, since we haven't traveled to any squares.)

    Create a list of all the squares we have visited (in the order that we visited them) that have taken us to this current square we are on. (This list will be empty at first, since we haven't traveled to any square yet.) We will call this list the path.

    (As we move to a new square, we will update this chess board (by marking the current square as visited) to reflect the squares we have traveled to thusfar (given the path that we have taken), and we will also update the path by adding the current square to the list.)
  
    Start on any square of the chess board.  

    Define a function called KnightsTour which takes as an input: the square that you are on, the path (that has taken us to this current square), and the chess board (with the squares that have been visited marked with X's). The KnightsTour function's output is a boolean (a true or false) that represents whether or not we have found a tour.

    The KnightsTour function is defined as follows:

      If the length of the path we have traveled to (with this current path) is less than 64 (the total number of squares on a chess board):

        Mark the current square that I am on as visited. (On the chess board, mark this current square with an X.)

        Add this current square to the path that has taken us to this current square.

        Make a list of all the possible squares that I could travel to from my current square.

        If any of these squares have already been visited (i.e. they already have an X on them on the chessboard), cross them off the list.

        If there are no unvisited squares in this list, then return false.

        For each square in the list of unvisited squares, choose that square, and name it the new square. 

          Call the KnightsTour function with this new square, updated path, and updated chess board as its input.
          If this recursive call is true, then return true.
          Otherwise, unmark the previously visited move.
  `
  return <ContentBox content={
    <HighlightableCodeBloc code={backtrackingPseudocode} startLine={0} endLine={0} />
  } />
}
function howToBakeACake(startLine=0, endLine=0) {
  let bakingACake = `
   BakingACake:

    Ingredients:
    2 Sticks of UnsaltedButter
    3 cups all-purpose flour
    1 tablespoon baking-powder
    1/2 teaspoon salt
    1 1/4 cups sugar
    4 large eggs, at room temperature
    1 tablespoon vanilla extract
    1 1/4 cups whole milk
    
    Step 1: Prepare Baking Pans
    Step 2: Allow Ingredients to Reach Room Temperature
    Step 3: Preheat the Oven
    Step 4: Stir Together Dry Ingredients
    Step 5: Combine the Butter and Sugar
    Step 6: Add Eggs One at a Time
    Step 7: Alternate Adding Dry and Wet Ingredients
    Step 8: Pour Batter into Pans and Bake
    Step 9: Check Cake for Doneness
    Step 10: Cool the Cake Layers
    Step 11: Assemble the Cake
    Step 12: Add the First Coat of Frosting
    `;
    return <ContentBox content={
      <HighlightableCodeBloc code={bakingACake} startLine={startLine} endLine={endLine} />
    } />
}

function fibonacci4() {
  let fibonacci4 = `
    fib(4)
    => fib(3) + fib(2)
    => fib(2) + fib(1) + fib(1) + fib(0)
    => fib(1) + fib(0) +    1   +    1    +   1
    => 1      +   1    +    1   +    1    +   1
    => 5

  i:        0, 1, 2, 3, 4
  fib(i):   1, 1, 2, 3, 5
  `
  return <ContentBox content={
    <HighlightableCodeBloc code={fibonacci4} startLine={0} endLine={0} />
  } />
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

function img(img_url, className="KnightMoveImage") {
  return <ContentBox content={
    <img className={className} src={img_url} /> 
  } />
}

function knightsTour() {
  return (<ContentBox content={
    <KnightsTour id="knightsTour" />
  }/>);
}

function FactDemo(props) {
  let initialState = {input: 0, output: 1};
  const [factState, setFactState] = useState(initialState);

  let setInput = (event) => {
    setFactState(
      {input: parseInt(event.target.value),
      output: 1,
      }
    )
  }
  let fact = (n) => {
    if (n === 1) {
      return 1;
    } else {
      let previousFact = fact(n-1)
      return previousFact * n;
    }
  }
  let solve = () => {
    setFactState(
      { 
        input: factState.input,
        output: fact(factState.input)
      }
    );
  };
  return (
      <div className = "KnightMoveProblem">
          <input onChange={setInput} />
          <button onClick={solve}>solve</button>
          <text>Output: {factState.output}</text>
      </div>
  )
}

function factDemo() {
  return (<ContentBox content={
    <FactDemo id="factDemo" />
  }/>);
}


function getChessProblemArticle() {
  return [
    H1("A Knight's Tour"),
    img("./knights-tour-130.png", "KnightMoveImageHeader"),
    H2(`Motivation`),
    paragraph(`The Knight's Tour problem is one of the most famous problems in Computer Science 
    and has been studied since antiquity. It was first studied in the 9th century, where the tour of the knight on a chessboard perplexed
    early mathematicians, who found many intricate patterns in the possible tours of the knight. It was then later rediscovered as a problem of
    interest in the 18th century by Leonard Euler who pioneered some of the earliest analysis. In modern times, the Knights Tour is an interesting
    problem to study because it is a simple case of a much more complicated problem in Computer Science.`),
    H2(`Introduction`),
    img('./chessboard_image.jpg',  'KnightMoveImage'),
    paragraph(`Chess is a game played on an 8x8 board with 16 different pieces. Each kind of piece has its own way of moving
    in the game of chess. The King can move in any direction but only one square. The queen is like the king except not limited
    to just one square. The pawn can move forward and only capture diagonally. The rook can only move perpendicularly. The bishop can only move diagonally and the knight only moves two squares forward and then one square to the left or right.`),
    img("./knight_move.png"),
    paragraph(`The knight has at most 8 possible squares it can move to and it cannot move over the edge of the board.`),
    H2(`Problem`),
    paragraph(`"I found myself one day in company where, on the occasion of a game of chess, someone proposed this question: to traverse with a knight all the cells of the chessboard, without ever arriving twice at the same, and commencing from a given cell." -- Leonard Euler`),
    paragraph(`Or in plainer english, given a knight on a board, try to construct a tour. A tour is a journey that will visit every square on a chessboard without retracing steps`),
    paragraph(`Let's try to find a tour!`),
    interactiveTour(),
    paragraph(`For a human, this problem seems tricky because we can easily trap our own knight if not careful.`),
    paragraph(`If we just look at the possible knight moves on the first move, there's at most 8 possible moves on the first move.
    Then on the second move, there can be at most 7 possible moves, then potentially 7 again, so on and so forth... In other words, as my knights journey gets longer, there 
    becomes an exponentially increasing amount of possible journeys my knight can take relative to the length of my journey.`),
    paragraph(`So how can we produce a tour?`),
    H2(`Terminology`),
    H3(`Algorithm`),
    paragraph('An algorithm is a sequence of statements and expressions used for problem-solving.'),
    paragraph(`Algorithms can be very simple in their nature, you can think of an  algorithm as a more advanced
    step-by-step set of instructions for solving a problem. Here's an example of an algorithm for how to bake a cake`),
    howToBakeACake(),
    paragraph(`The important thing to know about this algorithm is that it is comprised of:`),
    paragraph(`1. Name`),
    howToBakeACake(0, 18),
    paragraph(`2. Inputs`),
    howToBakeACake(20, 266),
    paragraph(`3. Instructions`),
    howToBakeACake(270, 746),
    paragraph(`Algorithms take inputs and execute instructions. The result of that execution is either
    returned as some kind of output (i.e. a Cake), or it will simply record the result somewhere. (i.e. if we wanted to save the cake in the fridge
      for later.)`),
    paragraph(`Algorithms are agnostic to computing devices, in other words, we have had algorithms long before we ever had digital computers.
    Some of the earliest known algorithms are Euclid's algorithm for finding the Greatest Common Denominator between two natural numbers which he
    first described in his book 'Elements' which he published in 300 BC. If you have ever added or multiplied two numbers, you're actually
    going step by step through an algorithm that takes two inputs (numbers) and produces some output (their product).`),
    img('./2dig_multiplication.png', "KnightMoveImage"),
    H3('Recursion'),
    paragraph(`One specific technique for writing algorithms is a technique called 'Recursion'`),
    paragraph(`Imagine you wanted to find out the distance from New York to Seattle. However, in this world, humans have only
    figured out how to communicate to someone within 200 miles of where they currently are (In this case you are in Seattle).
    Let's also say you know the exact distance you are to any city within 200 miles but don't know the distance farther.
    How can you find the distance from Seattle to New York?`),
    img('./two_people_calling.jpg', "KnightMoveImage"),
    paragraph(`If you can call someone within 200 miles of you -- i.e. you can call someone in Ellensburg -- then you can call
    that person and ask them, how far they are from New York. The distance of you
    to New york is the distance of you to that person + whatever that person says.`),
    img('./demo_of_calling.png', "KnightMoveImage"),
    paragraph(`However, now the question becomes, what's the distance for that person in Ellensburg to New York. To do that, the person will
    call someone within 200 miles of Ellensburg (let's say Spokane) and ask them for the answer, then add their own distance to that answer.`),
    paragraph(`When we called that someone else, we actually just gave them the same problem that we got, except now it is from their perspective. In
    other words, if we could call our algorithm (DistanceToNewYork), and it has an argument of (myCity). Then the
    DistanceToNewYork for myCity == DistanceToNewYork(city within 200 miles) + distance(myCity to city within 200 miles).
    This last expression is what is called the recursive relationship.`),
    paragraph(`So if this is the relationship, what ultimately stops us (you and everyone you know) from calling endlessly?`),
    paragraph(`Ultimately, what will happen is that we will reach someone who is within 200 miles of new York. In that case, 
    we hit the 'base case' which is if someone is within 200 miles of New York, just report that person's distance to New York rather
    than calling someone else. This way, we break the chain of calling`),
    paragraph(`An example of recursion in action is computing the Factorial function. If you recall, the factorial function is defined as taking
    as an input, a natural number (the whole numbers starting at 1), and producing as the output the product of all numbers leading up to
    and including that number. So as an example, the factorial of 6 = 6 * 5 * 4 * 3 * 2 * 1 = 720.`),
    paragraph(`How can we reframe this as a recursive algorithm? In other words, what's my recursive relationship and what's my base case?`),
    paragraph(`The base case is when my input is 1. 1 gives me a solution of 1.`),
    paragraph(`The recursive relationship is given fact(n), how can I define this in terms of smaller inputs to fact?`),
    paragraph(`The answer is fact(n-1) * n!`),
    paragraph(`To see how this works in code, look at this demo`),
    // TODO set breakpoints.
    factDemo(),
    H3('Data Structures'),
    paragraph(`Data Structures are ways for us to represent complicated problems as objects
    that can be recognized by a program.`),
    paragraph(`In a Knight's tour, the data-structure we will use to represent a Knight's tour is called a 'Graph'`),
    paragraph(`A Graph is basically a structure that represents the relationships between 'nodes' using 'edges'.
    This is a very general definition as many things can be represented as a graph.
    For instance, a social network is a graph because we can represent nodes as 'people' and edges as 'relationships' between people.`),
    img("./social_network.jpg"),
    paragraph(`Think about how we can represent a chessboard with a knight as a graph.`),
    img("./knights_move_graph.png"),
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
    revisiting where were?`),
    img("./HanselandGretelCropped.png"),
    paragraph(`We have to mark where we are going! When we run into a situation where 
    if the only squares left that the knight can travel to have already been previously visited, then we have
    reached a dead end, we have to backtrack until there is still a path that we can visit. We have to backtrack by
    picking up the crumbs that we placed.`),
    paragraph(` To describe this in pseudocode, (not real code but logically captures what is happening), we can
    represent the logic as this.`),
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
    topic in Computer Science but essentially, it is indeterminable. However, there is an approach that we can use
    that just simply combines the Warnsdorff heuristic plus backtracking which will reliably tour the chessboard for any square`),
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
