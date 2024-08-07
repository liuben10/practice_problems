from typing import List


def longestIncreasingSubsequence(nums: List[int]) -> int:
    LIS = {}
    for n in nums:
        if (len(LIS) == 0):
            LIS[n] = 1
        else:
            maxsublen = 0
            for k, v in LIS.items():
                if (n > k):
                    maxsublen = max(v, maxsublen)
            LIS[n] = maxsublen + 1
    return max(list(LIS.values()))

print(longestIncreasingSubsequence([5,1,2,3,4,3,7]))