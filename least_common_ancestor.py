class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def deserHelp(nums, idx):
    if (idx >= len(nums) or nums[idx] == -1):
        return None
    else:
        res = TreeNode(nums[idx])
        res.right = deserHelp(nums, 2 * idx + 2)
        res.left = deserHelp(nums, 2 * idx + 1)
        return res
    
def deser(nums):
    return deserHelp(nums, 0)

def isInTree(root, search):
    if (root == None):
        return False
    if (root == search):
        return True
    return isInTree(root.left, search) or isInTree(root.right, search)

def leastCommonAncestorH(root, a, b, ancestor):
    if (root == None):
        return
    if (root == a and isInTree(a, b)):
        ancestor[0] = a
        return
    if (root == b and isInTree(b, a)):
        ancestor[0] = b
        return
    if (not isInTree(root, a) or not isInTree(root, b)):
        return
    if (isInTree(root, a) and isInTree(root, b)):
        ancestor[0] = root
        leastCommonAncestorH(root.left, a, b, ancestor) 
        leastCommonAncestorH(root.right, a, b, ancestor)

def leastCommonAncestor(root, a, b):
    print(f"A={a.val}, B={b.val}")
    ancestor = [None]
    leastCommonAncestorH(root, a, b, ancestor)
    return ancestor[0]

def leastCommonAncestor2(root, a, b):
    ancestor = root
    def lchHelp(root, a, b):
        nonlocal ancestor
        if (root == None):
            return
        if (root == a and isInTree(a, b)):
            ancestor = a
            return
        if (root == b and isInTree(b, a)):
            ancestor = b
            return
        if (isInTree(root, a) and isInTree(root, b)):
            ancestor = root
            lchHelp(root.left, a, b)
            lchHelp(root.right, a, b)
    lchHelp(root, a, b)
    return ancestor

if __name__ == '__main__':
    testroot = TreeNode(3,
                        TreeNode(4,
                                 TreeNode(5),
                                 TreeNode(13)
                        ),
                        TreeNode(10,
                                TreeNode(11,
                                          TreeNode(12),
                                          TreeNode(19)),
                                TreeNode(8,
                                         TreeNode(13),
                                         TreeNode(15))
                        )
                )
    testa = testroot.right.right.left
    testb = testroot.right.right.right
    ancestor = leastCommonAncestor2(testroot, testa, testb)
    print(ancestor.val)

    
