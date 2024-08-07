from typing import List
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def convertListToBinaryTreeHelper(treeList: List, idx: int):
    print(f"idx={idx}")
    if (idx < len(treeList)):
        ret = TreeNode(treeList[idx])
        leftSkipped = False
        if ((2 * idx + 1) < len(treeList) and treeList[2 * idx + 1] is not None):
            leftRet = convertListToBinaryTreeHelper(treeList, 2 * idx + 1)
        else:
            leftRet = None
            leftSkipped = True
        if (not leftSkipped and (2 * idx + 2) < len(treeList) and treeList[2 * idx + 2] is not None):
            rightRet = convertListToBinaryTreeHelper(treeList, 2 * idx + 2)
        elif (leftSkipped and idx + 2 < len(treeList) and treeList[idx + 2] is not None):
            rightRet = convertListToBinaryTreeHelper(treeList, idx + 2)
        else:
            rightRet = None
        ret.left = leftRet
        ret.right = rightRet
        return ret
    else:
        return None
    
def printBinaryTree(root, height=0):
    padding = "".join([" " for i in range(height)])
    if (root is None):
        print(f"{padding}>x")
        return
    print(f"{padding}>{root.val}")
    printBinaryTree(root.left, height + 1)
    printBinaryTree(root.right, height + 1)

def convertListToBinaryTree(treeList: List):
    return convertListToBinaryTreeHelper(treeList, 0)

if __name__ == '__main__':
    btree = convertListToBinaryTree([1,None,2,None,3])
    printBinaryTree(btree)
