#include <vector>
#include <math.h>
#include <iostream>
#include <limits>

using namespace std;

class Solution {
public:
    int totalMin;
    vector<vector<int>> sums;
    Solution() : totalMin(numeric_limits<int>::max()) {}
    void minimumTotalHelper(vector<vector<int>>& triangle, int row, int idx, int& sumSoFar) {
        if (row == triangle.size() - 1) {
            sums[row][idx] = sumSoFar + triangle[row][idx];
            totalMin =  min(sumSoFar + triangle[row][idx], totalMin);
        } else {
            int newSumSoFar = sumSoFar + triangle[row][idx];
            if (newSumSoFar < sums[row][idx]) {
                sums[row][idx] = newSumSoFar; 
            } else {
                return;
            }
            minimumTotalHelper(triangle, row+1, idx, newSumSoFar);
            minimumTotalHelper(triangle, row+1, idx+1, newSumSoFar);
        }
    }
    int minimumTotal(vector<vector<int>>& triangle) {
        int sumSoFar = 0;
        for(auto row : triangle) {
            vector<int> sumRow = {};
            for (int i = 0; i < row.size(); i++) {
                sumRow.emplace_back(numeric_limits<int>::max());
            }
            sums.emplace_back(sumRow);
        }
        minimumTotalHelper(triangle, 0, 0, sumSoFar);
        return totalMin;
    }
};

void totalMinSize4() {
    vector<vector<int>> triangle = {
        {2},
        {3, 4},
        {6,5,7},
        {4,1,8,3},
    };
    Solution s = Solution();
    int totalMin = s.minimumTotal(triangle);
    cout << s.sums[0][0] << ", " << endl;
    cout << s.sums[1][0] << ", " << s.sums[1][1] << ", " << endl;
    cout << s.sums[2][0] << ", " << s.sums[2][1] << ", " << s.sums[2][2] << ", " << endl;
    cout << s.sums[3][0] << ", " << s.sums[3][1] << ", " << s.sums[3][2] << ", " << endl;
    cout << "Total Min: " << totalMin << endl;
}

void totalMinSize3() {
    vector<vector<int>> triangle = {
        {-1},
        {3, 2},
        {-3, 1, -1},
    };
    Solution s = Solution();
    int totalMin = s.minimumTotal(triangle);
    cout << s.sums[1][0] << ", " << s.sums[1][1] << ", " << endl;
    cout << s.sums[2][0] << ", " << s.sums[2][1] << ", " << s.sums[2][2] << ", " << endl;
    cout << "Total Min: " << totalMin << endl;
}

void totalMinSizeWeird() {
    vector<vector<int>> triangle = {
        {2},
        {3, 4},
        {6,5,9},
        {4,4,8,0}
    };
    Solution s = Solution();
    int totalMin = s.minimumTotal(triangle);
    cout << s.sums[0][0] << ", " << endl;
    cout << s.sums[1][0] << ", " << s.sums[1][1] << ", " << endl;
    cout << s.sums[2][0] << ", " << s.sums[2][1] << ", " << s.sums[2][2] << ", " << endl;
    cout << s.sums[3][0] << ", " << s.sums[3][1] << ", " << s.sums[3][2] << ", " << s.sums[3][3] << ", " << endl;
    cout << "Total Min: " << totalMin << endl;
}

int main(int argc, char ** argv) {
    totalMinSizeWeird();
}


// class Solution {
// public:
//     int totalMin;
//     vector<vector<int>> sums;
//     Solution() : totalMin(numeric_limits<int>::max()) {}

//     int minSumAt(vector<vector<int>>& triangle, int row, int idx) {
//         int prevIdx = idx - 1;
//         if (row - 1 >= 0) {
//             if (idx < triangle[row-1].size()-1 && idx > 0) {
//                 return min(sums[row-1][prevIdx] + triangle[row][idx], sums[row-1][prevIdx+1] + triangle[row][idx]);
//             } else if (idx == 0) {
//                 return sums[row-1][0] + triangle[row][idx];
//             } else  {
//                 return sums[row-1][prevIdx] + triangle[row][idx];
//             }
//         } else {
//             return triangle[row][idx];
//         }
//     }

//     void minimumTotalHelper(vector<vector<int>>& triangle) {
//         for (int ridx = 0; ridx < triangle.size(); ridx++) {
//             vector<int>& row = triangle[ridx];
//             for(int idx = 0; idx < row.size(); idx++) {
//                 sums[ridx][idx] = minSumAt(triangle,ridx,idx);
//                 if (ridx == triangle.size() - 1) {
//                     totalMin = min(sums[ridx][idx], totalMin);
//                 }
//             }
//         }
//     }
//     int minimumTotal(vector<vector<int>>& triangle) {
//         int sumSoFar = 0;
//         for(auto row : triangle) {
//             vector<int> sumRow = {};
//             for (int i = 0; i < row.size(); i++) {
//                 sumRow.emplace_back(0);
//             }
//             sums.emplace_back(sumRow);
//         }
//         minimumTotalHelper(triangle);
//         return totalMin;
//     }
// };
