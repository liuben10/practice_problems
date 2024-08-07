#include <math.h>
#include <limits>
#include <algorithm>
#include <vector>
#include <iostream>

using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    
    TreeNode(int _val) {
        val = _val;
        left = nullptr;
        right = nullptr;
    }
};

int maxDepth(TreeNode* root) {
    if (root == nullptr) {
        return 0;
    }
    return max(maxDepth(root->left), maxDepth(root->right))+1;
}

TreeNode* deserHelp(vector<int>& nums, int idx) {
    if (idx >= nums.size() || nums[idx] == -1) {
        return nullptr;
    } else {
        TreeNode* res = new TreeNode(nums[idx]);
        res->right = deserHelp(nums, 2 * idx + 2);
        res->left = deserHelp(nums, 2 * idx + 2);
        return res;
    }
}

TreeNode* deser(vector<int>& nums) {
    return deserHelp(nums, 0);
}

int main() {
    vector<int> testIn = {
        3,2,1,-1,4,6,7,-1,-1,8,9
    };
    TreeNode* test = deser(testIn);
    int maxd = maxDepth(test);
    cout << "Max depth: " << maxd << endl;
    return 0;
}
