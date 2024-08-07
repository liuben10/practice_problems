

def multiply(a, b):
    M = len(a)
    N = len(a[0])
    P = len(b[0])
    res = [[0 for _ in range(P)] for _ in range(M)]
    for i in range(M):
        for j in range(P):
            for k in range(N):
                res[i][j] += a[i][k] * b[k][j] 
    return res

if __name__ == '__main__':
    m = multiply(
        [
            [1,2,3],
            [4,5,6],
            [7,8,9],
        ],
        [
            [1],
            [2],
            [3],
        ]
    )
    for r in m:
        print(r)
