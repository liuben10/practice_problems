from typing import List

class Solution:

    def isAttackingQueen(self, board, row, col):
        n = len(board)
        for i in range(n):
            if (board[i][col] == "Q"):
                if (i != row):
                    return True
            elif (board[row][i] == "Q"):
                if (i != col):
                    return True
        ri = row
        ci = col
        while (ri >= 0 and ri < n and ci >= 0 and ci < n):
            if (board[ri][ci] == "Q" and (ri != row or ci != col)):
                return True
            ri -= 1
            ci -= 1
        ri = row
        ci = col
        while (ri >= 0 and ri < n and ci >= 0 and ci < n):
            if (board[ri][ci] == "Q" and (ri != row or ci != col)):
                return True
            ri += 1
            ci += 1
        ri = row
        ci = col
        while (ri >= 0 and ri < n and ci >= 0 and ci < n):
            if (board[ri][ci] == "Q" and (ri != row or ci != col)):
                return True
            ri -= 1
            ci += 1
        ri = row
        ci = col
        while (ri >= 0 and ri < n and ci >= 0 and ci < n):
            if (board[ri][ci] == "Q" and (ri != row or ci != col)):
                return True
            ri += 1
            ci -= 1
        return False
    
    def solveNQHelp(self, board, row, queens_left, solutions):
        if (queens_left == 0):
            sol = [row.copy() for row in board]
            solutions.append(sol)
            return
        else:
            n = len(board)
            for i in range(n):
                if (not self.isAttackingQueen(board, row, i)):     
                    board[row][i] = "Q"
                    self.solveNQHelp(board, row+1, queens_left - 1, solutions)

                    board[row][i] = "."
            return
   
    def solveNQueens(self, n: int) -> List[List[str]]:
        if (n == 1):
            return [["Q"]]
        board = [["." for _ in range(n)] for _ in range(n)]
        solutions = []
        for i in range(n):
            board[0][i] = "Q"
            self.solveNQHelp(board, 1, n-1, solutions)
            board[0][i] = "."
        ret = []
        for s in solutions:
            single_ret = []
            for row in s:
                single_ret.append("".join(row))
            ret.append(single_ret)
        return ret

if __name__ == '__main__':
    s = Solution()
    testN = [
        [".", ".", ".", ".", "."],
        [".", ".", ".", ".", "."],
        [".", ".", "Q", ".", "."],
        [".", ".", ".", ".", "."],
        [".", ".", ".", ".", "."],
    ]
    print(s.solveNQueens(4))