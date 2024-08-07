from typing import List, Tuple, Set

class Solution(object):
    def flip(self, region: List[Tuple[int, int]], board: List[List[str]]) -> None:
        for r in region:
            board[r[0]][r[1]] = 'X'
    
    def capture_region(self, board: List[List[str]], M: int, N: int, i: int, j: int) ->  Tuple[List[Tuple[int, int]], bool, Set[Tuple[int, int]]]:
        explore = []
        visited = set()
        explore.append((i, j))
        region = []
        connects_to_edge = False
        while (len(explore)):
            icord,jcord = explore.pop()
            visited.add((icord, jcord))
            region.append((icord, jcord))
            if (icord == 0 or jcord == 0 or icord == M-1 or jcord == N-1):
                connects_to_edge = True
            if icord - 1 >= 0 and (icord-1, jcord) not in visited and board[icord-1][jcord] == 'O':
                explore.append((icord-1, jcord))
            if jcord - 1 >= 0 and (icord, jcord-1) not in visited and board[icord][jcord-1] == 'O':
                explore.append((icord, jcord-1))
            if icord + 1 < M and (icord+1, jcord) not in visited and board[icord+1][jcord] == 'O':
                explore.append((icord+1, jcord))
            if jcord+1 < N and (icord, jcord+1) not in visited and board[icord][jcord+1] == 'O':
                explore.append((icord, jcord+1))
        return region, connects_to_edge, visited
        
            

    def solve(self, board:  List[List[str]]) -> None:
        """
        :type board: List[List[str]]
        :rtype: None Do not return anything, modify board in-place instead.
        """
        M = len(board)
        N = len(board[0])
        uber_visited = set()
        for i in range(M):
            for j in range(N):
                if board[i][j] == 'O' and (i, j) not in uber_visited:
                    print(f"Checking {i}, {j}... ")
                    region, connects_to_edge, visited = self.capture_region(board, M, N, i, j)
                    for coord in visited:
                        uber_visited.add(coord)
                    if (not connects_to_edge):
                        self.flip(region, board)
                
if __name__ == '__main__':
    s = Solution()
    test = ([
        ['O', 'X', 'X'],
        ['X', 'O', 'X'],
        ['X', 'O', 'X'],
        ['X', 'X', 'O']
    ])
    s.solve(test)
    print(test)