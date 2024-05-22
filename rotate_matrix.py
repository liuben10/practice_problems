from typing import List

def rotate(matrix: List[List[int]]):
    N = len(matrix)
    newmatrix = [[0 for _ in range(N)] for _ in range(N)]
    for j in range(N//2+1):
        for i in range(N-j):
            newmatrix[i+j][N-1-j] = matrix[j][i+j]
            newmatrix[N-1-j][N-i-j-1] = matrix[i+j][N-j-1]
            newmatrix[N-i-j-1][j] = matrix[N-j-1][N-i-j-1]
            newmatrix[j][i+j] = matrix[N-i-j-1][j]
    return newmatrix

print(rotate(
    [[1,2,3,16],
    [4,5,6,17],
    [7,8,9,18],
    [10,11,12,13]]
))
