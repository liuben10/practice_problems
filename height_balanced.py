from typing import Optional, Tuple
from list_to_binary_tree import TreeNode, convertListToBinaryTree
import math

class Solution:

    def isBalancedHelper(self, root: Optional[TreeNode]) -> Tuple[bool, int]:
        if (root is None):
            return True, 0
        else:
            leftIsBalanced, leftHeight = self.isBalancedHelper(root.left)
            rightIsBalanced, rightHeight = self.isBalancedHelper(root.right)
            # print(f"For root={root.val}, height is {max(leftHeight, rightHeight) + 1}")
            return (leftIsBalanced and rightIsBalanced and abs(leftHeight - rightHeight ) <= 1), max(leftHeight, rightHeight) + 1
        
    def isBalanced(self, root: Optional[TreeNode]) -> bool:
        isbalanced, height = self.isBalancedHelper(root)
        return isbalanced
    
if __name__ == '__main__':
    s = Solution()

    # test = [1,2,2,3,3,None,None,4,4]
    # test = [1,2,None,4]
    test = [1, None, 2, None, 3]
    root = convertListToBinaryTree(test)
    print(s.isBalanced(root))