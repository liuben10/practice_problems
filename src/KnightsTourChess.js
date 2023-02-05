import {nextKnightMoves} from './KnightMovesChess.js';

function toKey(kI, kJ) {
    return "" + kI + kJ;
}
function heuristic(kI,kJ,visited) {
    let fringe = nextKnightMoves(kI, kJ);
    let cnt = 0;
    fringe.forEach(
        (moveTuple) => {
            if (visited.has(toKey(moveTuple[0][1]))) {
                cnt += 1;
            }
        }
    );
    return cnt;
}

class Heap {
    constructor(comparator = (a, b) => a - b) {
        this.array = [];
        this.comparator = (i1, i2) => comparator(this.array[i1], this.array[i2]);
        this.size = 0;
    }


    add(value) {
        this.array.push(value);
        this.bubbleUp();
        this.size += 1;
    }

    swap(p_idx, idx) {
        let tmp = this.array[p_idx];
        this.array[p_idx] = this.array[idx];
        this.array[idx] = tmp;
    }

    bubbleUp() {
        let index = this.size - 1;
        const parent = (i) => Math.ceil(i / 2 - 1);
        while (parent(index) >= 0 && this.comparator(parent(index), index) > 0) {
            this.swap(parent(index), index);
            index = parent(index);
        }
    }

  remove(index = 0) {
    if (!this.size) return null;
    this.swap(index, this.size - 1);
    const value = this.array.pop();
    this.bubbleDown(index);
    this.size -= 1;
    return value;
  }

  bubbleDown(index = 0) {
    let curr = index;
    const left = (i) => 2 * i + 1;
    const right = (i) => 2 * i + 2;
    const getTopChild = (i) => (right(i) < this.size
      && this.comparator(left(i), right(i)) > 0 ? right(i) : left(i));
  
    while (left(curr) < this.size && this.comparator(curr, getTopChild(curr)) > 0) {
      const next = getTopChild(curr);
      this.swap(curr, next);
      curr = next;
    }
  }
}

function generateKnightsTour(knightGameState) {
    let [kI, kJ] = knightGameState.knightPos;
    let visited = new Set();
    visited.add(toKey(kI, kJ));
    let fringe = new Heap((moveTuple1, moveTuple2) => {
        let h1 = heuristic(moveTuple1[0], moveTuple1[1], visited);
        let h2 = heuristic(moveTuple2[0], moveTuple2[1], visited);
        return h2 - h1;
    });

    let knightMoves = nextKnightMoves(kI,kJ);
    let tour = [];
    knightMoves.forEach((moveTuple) => fringe.add(moveTuple));
    while (fringe.size && tour.length !== 63) {
        if (fringe.size === 0 && tour.length !== 63) {
            return "Not found";
        }
        let nextMov = fringe.remove();
        let [nextI, nextJ] = nextMov;
        visited.add(toKey(nextI, nextJ));
        tour.push([nextI, nextJ]);
        let nextMoves = nextKnightMoves(nextI, nextJ);
        nextMoves.forEach((moveTuple) => {
            if (!visited.has(toKey(moveTuple[0], moveTuple[1]))) {
                fringe.add(moveTuple);
            }
        })
    }
    return tour;
}

export {generateKnightsTour};