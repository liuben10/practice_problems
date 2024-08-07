from typing import Optional, List


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
        
class Solution:
    def levelOrderBottom(self, root: Optional[TreeNode]) -> List[List[int]]:
        fringe = []
        if (root is None):
            return fringe
        lvl = 0
        fringe.append((root, lvl))
        ret_dict = {}
        while(len(fringe)):
            node, lvl = fringe.pop(len(fringe)-1)
            if (lvl not in ret_dict):
                ret_dict[lvl] = [node.val]
            else:
                ret_dict[lvl].insert(0, node.val)
            if node.left is not None:
                fringe.append((node.left, lvl+1))
            if (node.right is not None):
                fringe.append((node.right, lvl+1))
        last_idx = len(ret_dict.keys()) - 1
        ret_list = []
        while (last_idx >= 0):
            ret_list.append(ret_dict[last_idx])
            last_idx -= 1
        return ret_list


if __name__ == '__main__': 
    test_t = TreeNode(3,
                TreeNode(
                        4,
                        TreeNode(16, None, None),
                        TreeNode(17)
                ),
                TreeNode(5))
    s = Solution()
    print(s.levelOrderBottom(test_t))
