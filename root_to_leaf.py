from typing import Optional, List
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
class Solution:
    def sumNumbers(self, root: Optional[TreeNode]) -> int:
        if root is None:
            return 0
        all_paths = self.collect_num_paths(root)
        print(all_paths)
        path_sum = 0
        for path in all_paths:
            path_sum += self.path_val(path)
        return path_sum
    
    def path_val(self, path: List[int]) -> int:
        path_str = "".join([str(p) for p in path])
        return int(path_str)

    def collect_num_paths(self, root: TreeNode) -> List[List[int]]:
        paths = []
        explore = []
        explore.append((root, []))
        while explore:
            curnode, path_so_far = explore.pop(0)
            new_path_so_far = path_so_far + [curnode.val]
            if (curnode.left is None and curnode.right is None):
                paths.append(new_path_so_far)
                continue
            if curnode.left is None:
                explore.insert(0, (curnode.right, new_path_so_far))
                continue
            if curnode.right is None:
                explore.insert(0, (curnode.left, new_path_so_far))
                continue
            explore.insert(0,(curnode.left, new_path_so_far))
            explore.insert(0,(curnode.right, new_path_so_far))
        return paths

if __name__ == '__main__':
    s = Solution()
    print(s.sumNumbers(TreeNode(3, TreeNode(4, TreeNode(5), TreeNode(6)), TreeNode(4))))