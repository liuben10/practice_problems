from typing import List

class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        stack = []
        max_rect_area = 0
        prev = None
        for i in  range(len(heights)):
            if (len(stack) == 0):
                max_rect_area = heights[i]
                stack.insert(0, (i, heights[i]))
            elif(heights[i] >= stack[0][1]):
                stack.insert(0, (i, heights[i]))
            else:
                while(len(stack) and stack[0][1] > heights[i]):
                    orig_i, h = stack.pop(0)
                    max_rect_area = max(h * (i - orig_i), max_rect_area)
                stack.insert(0, (i, heights[i]))
        print(stack)
        j = 1
        while(len(stack)):
            orig_i, h = stack.pop(0)
            max_rect_area = max(h * j, max_rect_area)
            j += 1
        return max_rect_area
    

if __name__ == '__main__':
    s = Solution()
    print(s.largestRectangleArea([2,1,2]))

