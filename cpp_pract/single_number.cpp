#include <vector>
#include <iostream>

using namespace std;

class Solution {
public:
    int singleNumber(vector<int>& nums) {
        if (nums.size() == 0) {
            return 0; // undefined.
        }
        int xor_agg = nums[0];
        for(int i = 1; i < nums.size(); i++) {
            xor_agg ^= -nums[i];
        }
        for(int num : nums) {
            if (num < 0) {
                if ((-num & xor_agg) > 0) {
                    return num;
                }
            } else {
                if ((num & xor_agg) > 0) {
                    return num;
                }
            }
            
        }
        return -1;  
    }
};

int main(int argc, char** argv) {
    Solution s = Solution();
    vector<int> testIn = {-1, -1, -2};
    cout << "Single number: " << (-1 ^ -1 ^ -3);
}