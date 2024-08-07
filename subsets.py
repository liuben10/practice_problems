import math
from typing import List

class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        max_mask = math.pow(2, len(nums))
        mask = 0
        subset_ret = []
        while (mask < max_mask):
            sub = []
            mcheck = mask
            for i in range(len(nums)):
                if (mcheck & 1):
                    sub.append(nums[i])
                mcheck >>= 1
            subset_ret.append(sub)
            mask += 1
        return subset_ret


if __name__ == '__main__':
    s = Solution()
    print(s.subsets([2,4,5]))
