#include <vector>
#include <math.h>
#include <iostream>

using namespace std;


class Solution {
public:
    int trap(vector<int>& height) {
        if (height.size() == 0) {
            return 0;
        }
        vector<int> leftheights;
        vector<int> rightheights;
        int N = height.size();
        for(int i = 0; i < N-1; i++) {
            if (leftheights.size() == 0) {
                leftheights.push_back(height[i]);
            } else if (height[i] < leftheights[i-1]) {
                leftheights.push_back(leftheights[i-1]);
            } else {
                leftheights.push_back(height[i]);
            }
        }

        for (int i = N-1; i >= 0; i--) {
            if (rightheights.size() == 0) {
                rightheights.insert(rightheights.begin(), height[i]);
            } else if (height[i] < rightheights[i+1]) {
                rightheights.insert(rightheights.begin(), rightheights[i+1]);
            } else {
                rightheights.insert(rightheights.begin(), height[i]);
            }
        }

        int caughtRainWater = 0;
        for(int i = 0; i < N; i++) {
            int topheight = min(leftheights[i], rightheights[i]);
            if (topheight - height[i] > 0) {
                caughtRainWater += topheight - height[i];
            }
        }
        return caughtRainWater;
    }
};

int main() {
    Solution s = Solution();
    vector<int> testIn = {4,2,0,3,2,5};
    int trapped = s.trap(testIn);
    cout << "Trapped " << trapped;
}