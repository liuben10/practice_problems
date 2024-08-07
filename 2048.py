from typing import List
import sys
import random

UP = 1
DOWN = 3
LEFT = 4
RIGHT = 2


""


""

# Game ends when there is a tile with value == 2048
# Randomly initialize 2 tiles with 2, 4
# Support move operation 
# move:
#    move takes a direction and for the direction, it picks either the row or the column.
#    moveMerge is called for the row or column which will: shift each number until it either merges once or cannot be merged
#     two tiles cannot be merged if the values of the tile is different.
class Game:

    def __init__(self):
        self.board = [
            [0 for i in range(4)] for i in range(4)
        ]

    def printBoard(self):
        for i in range(4):
            rstr = ""
            for j in range(4):
                rstr += str(self.board[i][j]) + ", "
            print(f"{rstr}\n")

    def hasZeroes(self):
        for i in range(4):
            for j in range(4):
                if (self.board[i][j] == 0):
                    return True
        return False
    
    def hasMergeable(self):
        xdir = [-1, 1, 0, 0]
        ydir = [0, 0, -1, 1]
        for i in range(4):
            for j in range(4):
                for k in range(4):
                        if i + xdir[k]>= 0 and j + ydir[k] >= 0 and i + xdir[k] < 4 and j + ydir[k] < 4:
                            if (self.board[i+xdir[k]][j+ydir[k]] == self.board[i][j] and self.board[i][j] != 0):
                                print(f"{self.board[i+xdir[k]][j+ydir[k]]} == {self.board[i][j]} for {i} {j}")
                                return True
        return False

    def addTokens(self):
        tkn = 2
        while(tkn > 0 and self.hasZeroes()):
            row = random.randint(0, 3)
            col = random.randint(0, 3)
            while(self.board[row][col] != 0):
                row = random.randint(0, 3)
                col = random.randint(0, 3)  
            self.board[row][col] = 2
            tkn -= 1

    def with_board(self, board: List[List[int]]):
        self.board = board


    def moveMerge(self, coll: List[int]):
        last = 3
        prevt = 3
        for t in range(3, -1, -1):
            if (prevt != t and coll[t] == coll[prevt] and coll[t] != 0):
                coll[prevt] += coll[t]
                coll[t] = 0
                break
            if (coll[t] != 0):
                prevt = t
        for t in range(3, -1, -1):
            if (coll[t] != 0 and coll[last] == 0):
                coll[last] = coll[t]
                coll[t] = 0
                last -= 1
            elif (coll[last] != 0):
                last -= 1

    def move(self, direction: int):
        nextboard = self.board.copy()
        if (direction == UP):
            for j in range(4):
                coll = []
                for i in range(3, -1, -1):
                    coll.append(self.board[i][j])
                self.moveMerge(coll)
                for i in range(3, -1, -1):
                    nextboard[i][j] = coll[3-i]
        elif (direction == RIGHT):
            for i in range(4):
                coll = self.board[i].copy()
                self.moveMerge(coll)
                nextboard[i] = coll.copy()
        elif (direction == DOWN):
            for j in range(4):
                coll =[]
                for i in range(4):
                    coll.append(self.board[i][j])
                self.moveMerge(coll)
                for i in range(4):
                    nextboard[i][j] = coll[i]
        elif (direction == LEFT):
            for i in range(4):
                coll = self.board[i].copy()
                coll.reverse()
                self.moveMerge(coll)
                coll.reverse()
                nextboard[i] = coll.copy()
        self.board = nextboard              


def test_move_merge(test_in, test_expected):
    g = Game()
    original_testin = test_in.copy()
    g.moveMerge(test_in)
    assert test_in == test_expected, f"ERROR, failed to match orig {original_testin} to {test_expected}, got {test_in}"
    print(f"Passed orig={original_testin}, out {test_in}")

def test_move(test_in_board, test_move_dir, test_expected):
    g = Game()
    g.with_board(test_in_board)
    g.move(test_move_dir)
    assert g.board == test_expected, f"ERROR, failed to match moved board {g.board} to {test_expected}"
    print(f"Passed board moved: {g.board}")

def test_has_mergeable(test_in, expected):
    g = Game()
    g.with_board(test_in)
    assert g.hasMergeable() == expected, f"ERROR, expected {expected} for {test_in}, but got {g.hasMergeable()}"



class Driver:
    def __init__(self):
        self.game = Game()
        self.game.addTokens()
        self.game.printBoard()
    
    def run(self):
        while self.game.hasZeroes() or self.game.hasMergeable():
            data = input("move\n")
            direction = 0
            if (data == "up" or data == "u"):
                direction = UP
            elif (data == "down" or data == "d"):
                direction = DOWN
            elif (data == "left" or data == "l"):
                direction = LEFT
            elif (data == "right" or data == "r"):
                direction = RIGHT
            self.game.move(direction)
            if (self.game.hasZeroes()):
                self.game.addTokens()
            self.game.printBoard()

if __name__ == '__main__':
    test_move_merge( [0, 2, 0, 2], [0, 0, 0, 4])
    test_move_merge([0,2,2,2], [0,0,2,4])
    test_move_merge([0, 2, 2, 0], [0,0,0,4])
    test_move_merge([0, 4, 4, 2], [0,0,8,2])
    test_move_merge([4, 4, 0, 2], [0,0,8,2])
    test_move_merge( [2,4,8,16], [2,4,8,16])
    test_move_merge( [2,0,0,4], [0,0,2,4])
    test_move_merge( [4,4,0,0], [0,0,0,8])
    test_has_mergeable([
        [4, 2, 32, 64],
        [2, 4, 8, 16],
        [8, 16, 2, 8],
        [2, 4, 8, 16],
    ], False)
    test_move([
        [0, 0, 0, 4],
        [0, 0, 0, 4],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    DOWN,
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 8],
    ])
    test_move([
        [0, 0, 4, 4],
        [0, 0, 0, 4],
        [0, 0, 0, 0],
        [0, 0, 2, 2],
    ],
    RIGHT,
    [
        [0, 0, 0, 8],
        [0, 0, 0, 4],
        [0, 0, 0, 0],
        [0, 0, 0, 4],
    ]),
    test_move([
        [0, 0, 4, 4],
        [0, 0, 0, 4],
        [0, 0, 0, 0],
        [0, 0, 2, 2],
    ],
    UP,
    [
        [0, 0, 4, 8],
        [0, 0, 2, 2],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]),
    test_move([
        [0, 0, 4, 4],
        [0, 0, 0, 4],
        [0, 0, 0, 0],
        [0, 0, 2, 2],
    ],
    LEFT,
    [
        [8, 0, 0, 0],
        [4, 0, 0, 0],
        [0, 0, 0, 0],
        [4, 0, 0, 0],
    ])


    d = Driver()
    d.run()