from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[List[int]]:
        lookup = {}
        for i, n in enumerate(nums):
            lookup[target - n] = [(n, i)]
        for i, n in enumerate(nums):
            if (n in lookup):
                lkey = (n, i)
                if (lookup[n][0] != lkey and len(lookup[n]) < 2):
                    lookup[n].append(lkey)
        ret = set()
        for _, v in lookup.items():
            if (len(v) == 2):
                if (v[1][0] > v[0][0]):
                    ret.add((v[0][0], v[1][0]))
                else:
                    ret.add((v[1][0], v[0][0]))
        return list(ret)

    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
        pass
        
if __name__ == '__main__':
    s = Solution()
    testL = [3,2,5,6,7,8,1,2,4,5]
    target = 8
    print(s.twoSum(testL, target))