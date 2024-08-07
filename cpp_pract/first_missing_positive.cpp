#include<vector>
#include <iostream>
using namespace std;

class Solution {
public:

    void swp(vector<int>& nums, int src, int dest) {
        int tmp = nums[dest];
        nums[dest] = nums[src];
        nums[src] = tmp;
    }
    int firstMissingPositive(vector<int>& nums) {
        int inc = 0;
        while(inc < nums.size()) {
            if (nums[inc] > 0) {
                if (nums[inc] == inc + 1) { // if in the correct position, we don't need to move this
                    inc++;
                    continue;
                }
                if (nums[inc] < nums.size()) { // wrong position but fits in array, so we swap and then check again.
                    if (nums[nums[inc]-1] == nums[inc]) {
                        inc++;
                        continue;
                    }
                    swp(nums, inc, (nums[inc]-1));
                } else { // wrong position, but we cannot swap this element into any position in the vector.
                    inc++;
                }
            } else {
                inc++; // we cannot swap anything with the negative so just increment.
            }
        }
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] != i+1) {
                return i+1;
            }
        }
        return nums.size()+1;
    }
};

int main(int argc, char** argv) {
    Solution s = Solution();
    vector<int> testIn = {1,1};
    cout << s.firstMissingPositive(testIn);
}