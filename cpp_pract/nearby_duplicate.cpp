#include <vector>
#include <unordered_map>
#include <math.h>
#include <iostream>

using namespace std;


/*
v = {1,2,3,1,4,2}, k=4
m = {1:0, 2:1, 3:2}

1,3



*/
class Solution {
public:
    bool containsNearbyDuplicate(vector<int>& nums, int k) {
        unordered_map<int, int> indices;
        for(int i = 0; i < nums.size(); i++) {
            auto indicesIter = indices.find(nums[i]);
            if (indicesIter == indices.end()) {
                indices.emplace(nums[i], i);
            } else {
                int diff = i - indicesIter->second;
                if (diff <= k) {
                    return true;
                } else {
                    indicesIter->second = i;
                }
            }
        }
        return false;
    }
};

int main() {
    Solution s = Solution();
    vector<int> nums = {1,0,1,1};
    cout << s.containsNearbyDuplicate(nums, 1) << endl;
}