import random
from typing import List

class Solution:

    def swap(self, nums: List[int], src: int, dest: int):
        tmp = nums[src]
        nums[src] = nums[dest]
        nums[dest] = tmp
        

    def partitionInPlace(self, nums: List[int], pi: int, start: int, end: int) -> None:
        p = nums[pi]
        if (pi != end):
            self.swap(nums, pi, end)
        lp = start-1
        hp = start
        while(hp < end):
            if (nums[hp] <= p):
                lp += 1
                self.swap(nums, hp, lp)
            hp += 1
        if (lp + 1 < end):
            self.swap(nums, end, lp + 1)
        return lp+1
    

    def sortColorsHelper(self, nums, start, end):
        # print(f"sorting {nums}, at {start}, {end}")
        if (end - start <= 0):
            return nums
        else:
            select = random.randint(start, end)
            lp = self.partitionInPlace(nums, select, start, end)
            self.sortColorsHelper(nums, start, lp-1)
            self.sortColorsHelper(nums, lp+1, end)



    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        self.sortColorsHelper(nums, 0, len(nums)-1)



if __name__ == '__main__':
    def checkSorted(test):
        prev = -1
        for l in test:
            if (l >= prev):
                prev = l
            else:
                return False
        return True
    
    print(checkSorted([0,1,2] ))
    
    s = Solution()

    # tc = [0, 0, 1, 0, 2]
    # s.sortColors(tc)
    # print(tc)

    allPassed = True
    tc = 0
    while(tc < 1000):
        randlen = random.randint(0, 100)
        test_case = []
        for i in range(randlen):
            nextint = random.randint(0, 2)
            test_case.append(nextint)
        orig_test_case = test_case.copy()
        s.sortColors(test_case)
        sorted = checkSorted(test_case)
        if not sorted:
            allPassed = False
            print(f"{orig_test_case}, {test_case} was not sorted")
        tc += 1
    if (allPassed):
        print("ALL PASSED")
