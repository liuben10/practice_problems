#include <vector>
#include <iostream>
#include <sstream>
#include "tree_util.hpp"
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
using namespace std;

class Solution {
public:
    void preorderTraversalHelp(TreeNode* root, vector<int>& result) {
        if (root == nullptr) {
            return;
        }
        result.emplace_back(root->val);
        preorderTraversalHelp(root->left, result);
        preorderTraversalHelp(root->right, result);
    }
    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> result = {};
        preorderTraversalHelp(
            root, 
            result
        );
        return result;
    }
};

int main(int argc, char **argv) {
    TreeNode* testRoot = convertListToTreeNode({new int(1), nullptr, new int(3), nullptr, nullptr, new int(2), new int(5)});
    string testIn = printTree(testRoot, 0);
    cout << testIn << endl;
    Solution s = Solution();
    vector<int> res = s.preorderTraversal(testRoot);
    cout << res.size() << endl;
    stringstream rescapture;
    for (const auto &piece : res) {
        rescapture << piece << ", ";
    }
    cout << rescapture.str() << endl;
}