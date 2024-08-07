from typing import List, Set

class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        if (len(nums) == 0):
            return 0
        numset: Set[int] = set(nums)
        longest: int = 1
        starts: List[int] = []
        ends: List[int] = []
        for n in numset:
            if ((n + 1) in numset and (n - 1) not in numset):
                starts.append(n)
            elif ((n-1) in numset and (n + 1) not in numset):
                ends.append(n)
        starts.sort()
        ends.sort()
        for i in range(len(starts)):
            length = ends[i] - starts[i] + 1
            if (length > longest):
                longest = length
        return longest
    

if __name__ == '__main__':
    s = Solution()
    print(s.longestConsecutive([100,4,200,1,3,2]))