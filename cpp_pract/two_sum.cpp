#include <vector>
#include <unordered_map>

using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> diffs;
        for (int i = 0; i < nums.size(); i++) {
            diffs.insert({target - nums[i], i});
        }
        vector<int> solution;
        for (int i = 0; i < nums.size(); i++) {
            if (diffs.find(target - nums[i]) != diffs.end() && diffs.find(target - nums[i])->second != i) {
                solution.emplace_back(i);
                solution.emplace_back(diffs.find(target - nums[i])->second);
                return solution;
            }
        }
        return solution;
    }
};