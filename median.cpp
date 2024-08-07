#include <vector>
#include <iostream>
#include <deque>
#include <tuple>

using namespace std;



double median(vector<int>& nums) {
    int l = 0;
    int r = nums.size() - 1;
    int t = 0;
    while (l < r) {
            l += 1;
            r -= 1;
            if (l == r) {
                return nums[l];
            }
    }
    return (nums[r] + nums[l]) / 2.0;
}

double medianTwoSorted(vector<int>& nums1, vector<int>& nums2) {
    int N = nums1.size();
    int M = nums2.size();
    if (M == 0) {
        int n = N;
        return n % 2 == 0 ? (nums1[n/2] + nums1[(n/2)-1]) : nums1[n/2]; 
    }
    if (N == 0) {
        int n = M;
        return n % 2 == 0 ? (nums2[n/2] + nums2[(n/2)-1]) : nums2[n/2];
    }
    int l1 = 0;
    int l2 = 0;
    int n = (N + M);
    bool iseven = n % 2 == 0;
    int medidx = (N + M) / 2;
    int turn = 0;
    bool islastupa = false;
    deque<tuple<int, int>> lasttwo = deque<tuple<int, int>>();
    
    while(turn < medidx && l1 < N && l2 < M) {
        if (nums1[l1] < nums2[l2]) {
            l1++;
            islastupa = true;
            if (lasttwo.size() == 2) {
                lasttwo.pop_front();
            }
            lasttwo.push_back(make_tuple(0, l1));
        } else {
            l2++;
            islastupa = false;
            if (lasttwo.size() == 2) {
                lasttwo.pop_front();
            }
            lasttwo.push_back(make_tuple(1, l2));
        }
        turn++;
    }
    while(turn < medidx && l1 < N) {
        l1++;
        islastupa=true;
        turn++;
        if (lasttwo.size() == 2) {
            lasttwo.pop_front();
        }
        lasttwo.push_back(make_tuple(0, l1));
    }
    while(turn < medidx && l2 < M) {
        l2++;
        islastupa=false;
        turn++;
        if (lasttwo.size() == 2) {
            lasttwo.pop_front();
        }
        lasttwo.push_back(make_tuple(1, l2));
    }
    
    int n1 = get<0>(lasttwo.front()) == 0 ? nums1[get<1>(lasttwo.front())] : nums2[get<1>(lasttwo.front())];
    int n2 = get<0>(lasttwo.back()) == 0 ? nums1[get<1>(lasttwo.back())] : nums2[get<1>(lasttwo.back())];
    if (iseven) {
        return (n1 + n2) / 2.0;
    } else {
        return n1 > n2 ? n2 : n1;
    } 
}

int main() {
    vector<int> test = {0,0,0,0,0};
    vector<int> test2 = {-1,0,0,0,0,0,1};
    cout << medianTwoSorted(test, test2);
    return 0;
}