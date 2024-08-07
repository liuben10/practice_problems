from typing import Optional

class TreeNode:
    def __init__(self, val: int, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class BSTIterator:

    def __init__(self,  root: TreeNode) -> None:
        self.root = root
        self.visitStack = []
        while root.left is not None:
            self.visitStack.append(root)
            root = root.left

    def next(self) -> Optional[int]:
        ret = None
        if(len(self.visitStack)):
            cur = self.visitStack.pop()
            ret = cur
            if (cur.right is not None):
                root = cur.right
                while(root is not None):
                    self.visitStack.append(root)
                    root = root.left
        return ret.val if ret else None
    
    def hasNext(self):
        return len(self.visitStack)
        

testRoot = TreeNode(
    6,
    TreeNode(4,
             TreeNode(2),
             TreeNode(5)),
    TreeNode(10,
             TreeNode(8),
             TreeNode(11))
)

iter = BSTIterator(testRoot)
while(iter.hasNext()):
    print(f"{iter.next()}")
