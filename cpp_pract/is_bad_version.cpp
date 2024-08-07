// The API isBadVersion is defined for you.
// bool isBadVersion(int version);
#include <iostream>

using namespace std;

class Solution {
public:
    int isBadVersion(int n) {
        return n >= 4;
    }
    int firstBadVersion(int n) {
        int low = 0;
        int hi = n;
        while (low <= hi) {
            int mid = low + ((hi - low) / 2);
            if ((isBadVersion(mid) && !isBadVersion(mid-1)) || ((mid == 0) && isBadVersion(mid))) {
                return mid;
            } else {
                if (isBadVersion(mid) && isBadVersion(mid-1)) {
                    hi = mid-1;
                } else if (!isBadVersion(mid) && !isBadVersion(mid-1) || (mid == 0) && !isBadVersion(mid)) {
                    low = mid+1;
                }
            }
        }
        return -1;
    }
};

int main() {
    Solution s = Solution();
    cout << s.firstBadVersion(5) << endl;
}