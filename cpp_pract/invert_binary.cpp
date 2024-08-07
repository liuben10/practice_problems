#include <iostream>
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

void printTree(TreeNode* tn, size_t pad) {
    if (tn == nullptr) {
        return;
    }
    std::string padd(pad, ':');
    std::cout << padd << tn->val << std::endl;
    if (tn->left != nullptr) {
        printTree(tn->left, pad+1);
    }
    if (tn->right != nullptr) {
        printTree(tn->right, pad+1);
    }
    return;
}

/**
 * Definition for a binary tree node.

 */
class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (root == nullptr) {
            return nullptr;
        }
        if (root->left == nullptr && root->right == nullptr) {
            return root;
        }
        if (root->left == nullptr) {
            root->left = invertTree(root->right);
            root->right = nullptr;
            return root;
        }
        if (root->right == nullptr) {
            root->right = invertTree(root->left);
            root->left = nullptr;
            return root;
        }
        TreeNode* reversedLeft = invertTree(root->left);
        TreeNode* reversedRight = invertTree(root->right);
        root->left = reversedRight;
        root->right = reversedLeft;
        return root;
    }
};


int main() {
    std::cout << "Hello World!" << std::endl;
    TreeNode b(4);
    TreeNode h(5);
    TreeNode j(6);
    TreeNode l(9, &h, &j);
    TreeNode k(11);
    TreeNode c(10, &l, &k);
    TreeNode a(3, &b, &c);
    TreeNode* testIn = &a;
    printTree(testIn, 0);
    std::cout << "TEST OUT: " << std::endl;
    Solution s;
    TreeNode* testOut = s.invertTree(testIn);
    printTree(testOut, 0);
    return 0;
}