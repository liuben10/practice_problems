#include <vector>
#include <iostream>
#include <sstream>

using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};


TreeNode* convertListToTreeNodeHelp(vector<int*> testIn, int idx) {
    if (testIn[idx] == nullptr) {
        return nullptr;
    }
    TreeNode* root =  new TreeNode(*testIn[idx]);
    if (2 * idx + 1 < testIn.size()) {
        root->left = convertListToTreeNodeHelp(testIn, 2*idx+1);
    }
    if (2 * idx + 2 < testIn.size()) {
        root->right = convertListToTreeNodeHelp(testIn, 2 * idx + 2);
    }
    return root;
}

TreeNode* convertListToTreeNode(vector<int*> testIn) {
    return convertListToTreeNodeHelp(testIn, 0);
}

string printTree(TreeNode* root, int pad) {
    if (root == nullptr) {
        return "";
    }
    string padding(pad, ' ');
    stringstream printed;
    printed << padding << root->val << endl;
    string left_str = printTree(root->left, pad+1);
    string right_str = printTree(root->right, pad+1);
    printed << left_str;
    printed << right_str;
    return printed.str();
}