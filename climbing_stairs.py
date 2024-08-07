class Solution:
    def climbStairs(self, n: int) -> int:
        if (n <= 2):
            return n
        sol_1 = 2
        sol_2 = 1
        sum = 3
        for i in range(1, n):
            if (i <= 2):
                continue
            else:
                sol_2 = sol_1
                sol_1 = sum
                sum = sol_1 + sol_2
        return sum
    
if __name__ == '__main__':
    s = Solution()
    for i in range(10):
        print(f"i={i}, s={s.climbStairs(i)}")
                
