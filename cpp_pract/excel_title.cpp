#include <string>
#include <sstream>
#include <iostream>
#include <algorithm>

using namespace std;

class Solution {
public:
    const string alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


    // 701 = 26 * 26 + 25
    // 28 = 26 + 2
    // 1 = 1
    string convertToTitle(int n) {
        string ans ="";
        while(n>0){
            int temp = (n-1)%26;
            ans.push_back(alphabet[temp]);
            n=(n-1)/26;
        }
        reverse(ans.begin(),ans.end());
        return ans;
    }

    int titleToNumber(string columnTitle) {
        reverse(columnTitle.begin(), columnTitle.end());
        int i = 0;
        int res = 0;
        int mult26 = 1;
        while (i < columnTitle.size()) {
            int offset = alphabet.find(columnTitle[i]) + 1;
            res += offset * mult26;
            mult26 *= 26;
            i += 1;
        }
        return res;
    }
};

int main() {
    Solution s = Solution();
    //  cout << s.convertToTitle(52) << endl;
     cout << s.titleToNumber("FXSHRXW") << endl;
    
}   