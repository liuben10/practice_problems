#include <string>
#include <sstream>
#include <iostream>

using namespace std;


class Solution {
public:
    // generates the permutation string from 1...n
    string buildPermutationString(int n) {
        stringstream ss;
        for(int i = 1; i <= n; i++) {
            ss << i;
        }
        return ss.str();
    }
    
    int factorial(int n) {
        if (n == 1) {
            return 1;
        }  
        return n * factorial(n-1);
    }

    string getNewPString(string& pstring, int selection) {
        string before_str = pstring.substr(0, selection);
        string after_str = pstring.substr(selection+1);
        return before_str + after_str;
    }

    string getPermutationHelper(string& pstring, int n, int k) {
        if (n == 1) {
            return pstring;
        }
        int subFact = factorial(n-1);
        int selection = (k-1) / subFact;
        int newK = k - selection * subFact;
        string newPstr = getNewPString(pstring, selection);
        stringstream res;
        string recursive = getPermutationHelper(newPstr, n-1, newK);
        res << pstring[selection] << recursive;
        return res.str();
    }

    string getPermutation(int n, int k) {
        string pstring = buildPermutationString(n);
        return getPermutationHelper(pstring, n, k);
    }
};

int main() {
    Solution s = Solution();
    string testIn = "1234";
    cout << s.getPermutationHelper(testIn, 4, 7) << endl;
}