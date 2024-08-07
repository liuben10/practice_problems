from typing import List

class SolutionEasy:
    def maxProfit(self, prices: List[int]) -> int:
        check = None
        max_profit = 0
        for p in prices:
            if check is None or p < check:
                check = p
            elif (p > check):
                max_profit = max(max_profit, p - check)
        return max_profit
    
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        prof_so_far = 0
        hold_p = None
        max_at_p = 0

        for p in prices:
            if (hold_p is None):
                hold_p = p
                max_at_p = p
            elif (p < max_at_p):
                prof_so_far += (max_at_p - hold_p)
                hold_p = p
                max_at_p = p
            else:
                max_at_p = p
        
        prof_so_far += max_at_p - hold_p
        return prof_so_far
    

if __name__ == '__main__':
    s = Solution()
    print(s.maxProfit([7,6,4,3,1]))