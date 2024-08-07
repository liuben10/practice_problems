#include <vector>
#include <iostream>

using namespace std;

class Solution {
public:
    void insertAndBump(vector<int>& nums1, int i, int elem) {

        int tmp;
        for (auto start = nums1.begin() + i; start != nums1.end(); start++) {
            if (start == nums1.begin() + i) {
                tmp = *start;
                *start = elem;
            } else {
                int newTemp = *start;
                *start = tmp;
                tmp = newTemp;
            }
        }
    }
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        if (n == 0) {
            return;
        }
        if (m == 0) {
            for(int i = 0; i < n; i++) {
                nums1[i] = nums2[i];
            }
            return;
        }
        int n1Pos = 0;
        int n2Pos = 0;
        int insertionPos = 0;
        while (insertionPos < (m + n)) {
            if (*(nums1.begin() + n1Pos) > *(nums2.begin() + n2Pos)) {
                insertAndBump(nums1, insertionPos, *(nums2.begin() + n2Pos));
                n2Pos ++;
            } else {
                if (n1Pos < m) {
                    n1Pos++;
                } else {
                    insertAndBump(nums1, insertionPos, *(nums2.begin() +  n2Pos));
                    n2Pos++;
                }
            }
            insertionPos++;
        }
    }
};

int main() {
    Solution s = Solution();
    vector<int> testA = vector<int>{2,5,6,7,0};
    vector<int> testB = vector<int>{1};
    // s.insertAndBump(testA, 2, 9);
    s.merge(testA, 4, testB, 1);
    for (auto aIt = testA.begin(); aIt != testA.end(); aIt++) {
        cout << *aIt <<", ";
    }
}