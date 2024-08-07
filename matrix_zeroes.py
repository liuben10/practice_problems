from typing import List

class Solution:

    def zeroOutRow(self, matrix, i, j, colors):
        cols = len(matrix[0])
        for jit in range(cols):
            if (((i, jit) not in colors) and matrix[i][jit] == 0):
                colors[(i, jit)] = "p"
            elif ((i, jit) not in colors):
                colors[(i, jit)] = "b"
                matrix[i][jit] = 0

    def zeroOutCol(self, matrix, i, j, colors):
        rows = len(matrix)
        for iit in range(rows):
            if (((iit, j) not in colors) and matrix[iit][j] == 0):
                colors[(iit, j)] = "p"
            elif (((iit, j) not in colors)):
                colors[(iit, j)] = "b"
                matrix[iit][j] = 0        

    def setAndColorZeroes(self, matrix, i, j, colors):
        # assume matrix[i][j] == 0
        colors[(i, j)] = "p"
        self.zeroOutRow(matrix, i, j, colors)
        self.zeroOutCol(matrix, i, j, colors)
        # print(f"{matrix} and colors {colors}")

    def setZeroes(self, matrix: List[List[int]]) -> None:
        """
        Do not return anything, modify matrix in-place instead.
        """
        nrows = len(matrix)
        ncols = len(matrix[0])
        colors = {}
        for i in range(nrows):
            for j in range(ncols):
                # print(f"{(i,j)}, matrix[i][j]={matrix[i][j]}")
                if (((i, j) in colors and colors[(i,j)] == "p") or ((i, j) not in colors and matrix[i][j] == 0)):
                    self.setAndColorZeroes(matrix, i, j, colors)
                    
if __name__ == '__main__':
    s = Solution()
    test = [
        [2,1,4,0],
        [3,2,5,6],
        [3,0,4,5]
    ]
    s.setZeroes(test)
    print(test)