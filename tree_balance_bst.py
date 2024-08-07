from typing import List,Optional

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
class Solution:
    def checkRet(self, ret: TreeNode, pad: int) -> None:
        if ret is None:
            return
        print(":" * pad + str(ret.val))
        if (ret.left):
            self.checkRet(ret.left, pad + 1)
        if (ret.right):
            self.checkRet(ret.right, pad + 1)
    def sortedArrayToBSTTreeNodeHelp(self, nums: List[int], low: int, hi: int) -> Optional[TreeNode]:
        med = (low + hi) // 2
        if (med < len(nums) and med >= 0):
            medNode = TreeNode(nums[med])
        else:
            return None
        if (med - 1 >= low):
            medNode.left = self.sortedArrayToBSTTreeNodeHelp(nums, low, med - 1)
        if (med + 1 <= hi):
            medNode.right = self.sortedArrayToBSTTreeNodeHelp(nums, med + 1, hi)
        return medNode
    def sortedArrayToBST(self, nums: List[int]) -> Optional[TreeNode]:
        return self.sortedArrayToBSTTreeNodeHelp(nums, 0, len(nums))

            
    

solver = Solution()

solver.sortedArrayToBST([-1,2,3])
        
