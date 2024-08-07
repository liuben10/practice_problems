#include <iostream>
#include <algorithm>    // std::max
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */

  struct TreeNode {    
        int val;
        TreeNode *left;
        TreeNode *right;
        TreeNode() : val(0), left(nullptr), right(nullptr) {}
        TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
        TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
  };
class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (root == nullptr) {
            return 0;
        } else if (root->left == nullptr && root->right == nullptr) {
            return 1;
        } else {
            int leftDepth = maxDepth(root->left);
            int rightDepth = maxDepth(root->right);
            int maxDepthSoFar = std::max(leftDepth, rightDepth);
            return maxDepthSoFar+1;
        }
    }
};

int main() {
    Solution s;
    TreeNode z = TreeNode(3);
    TreeNode w = TreeNode(4);
    TreeNode x = TreeNode(5, &z, &w);
    TreeNode y = TreeNode(4);
    TreeNode t = TreeNode(11, &y, nullptr);
    TreeNode a = TreeNode(90, &x, &t);
    int maxD = s.maxDepth(&a);
    std::cout << maxD;
}