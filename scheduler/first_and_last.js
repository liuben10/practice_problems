/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

var searchRange = function(nums, target) {
    if (nums[0] == nums.at(-1) && nums[0] == target) {
        return [0, nums.length - 1];
    } else if (nums[0] == nums.at(-1) && nums[0] != target) {
        return [-1, -1];
    }
    let hi = nums.length;
    let low = 0;
    let found = -1;
    while (low < hi) {
        let mid = 0;
        if ((hi + low) % 2) {
            mid = ((hi + low)-1) / 2;
        } else {
            mid = (hi + low) / 2;
        }
        console.log("%d, %d, %d", mid, hi, low);
        if (nums[mid] == target) {
            found = mid;
            break
        }
        else if(nums[mid] < target) {
            low = mid;
        } else {
            hi = mid;
        }
    }
    if (found < 0) {
        return [-1, -1];
    }
    console.log("FOUND %d", found);
    if (found == 0) {
        lowIdx = 0;
    } else {
        if (nums[found-1] != target) {
            lowIdx = found;
        } else {
            lowIdx = -1;
            low = 0;
            hi = found;
        
            while (low < hi) {
                let mid = 0;
                if ((hi + low) % 2) {
                    mid =  ((hi + low)-1) / 2;
                } else {
                    mid = (hi + low) / 2;
                }
                console.log("%d, %d, %d", mid, hi, low);
                if (mid == 0) {
                    if (nums[mid] == target) {
                        lowIdx = 0;
                    }
                    break;
                }
                if (mid + 1 == nums.length) {
                    if (nums[mid] == target) {
                        lowIdx = nums.length-1;
                    }
                    break;
                }
                let i = 0;
                let targCheck = nums[mid-1+i] != target;
                let initialTargCheck = targCheck;
                while (i < 3 && !targCheck) {
                    i++;
                    targCheck = nums[mid-1+i] == target;
                }
                if (initialTargCheck && !targCheck) {
                    lowIdx = i;
                    break;
                } else if (initialTargCheck && targCheck) {
                    low = mid;
                } else {
                    hi = mid;
                }           
            }
        
            console.log("FOUND LOW %d", lowIdx);
        }         
    }

    if (found + 1 == nums.length) {
        if (nums.at(-1) == target){
            hiIdx = nums.length - 1;
        }
    } else {
        if (nums[found+1] != target) {
            hiIdx = found;
        } else {
            hiIdx = -1;
            low = found;
            hi = nums.length;
            while (low < hi) {
                let mid = 0;
                if ((hi + low) % 2) {
                    mid =  ((hi + low)-1) / 2;
                } else {
                    mid = (hi + low) / 2;
                }
                console.log("%d, %d, %d", mid, hi, low);
                if (mid + 1 == nums.length) {
                    if (nums[mid] == target) {
                        hiIdx = nums.length-1;
                    }
                    break;
                }
                if (mid == 0) {
                    if (nums[mid] == target) {
                        hiIdx = 0;
                    }
                    break;
                }
                let i = 0;
                let targCheck = nums[mid-1+i] == target;
                let initialTargCheck = targCheck;
                while (i < 3 && targCheck) {
                    i++;
                    targCheck = nums[mid-1+i] == target;
                }
                if (initialTargCheck && !targCheck) {
                    hiIdx = i;
                    break;
                } else if (initialTargCheck && targCheck) {
                    low = mid;
                } else {
                    hi = mid;
                }
            }
            console.log(" FOUND HIGH %d", hiIdx);
        }
    }
    
    
    return [lowIdx, hiIdx];
};

let testCase = [1,1,1,1,1,1,1,1,1,1,2,4,4,4,4,4,4,7,7,7,7,8];
let target = 4;
console.log(searchRange([1, 1, 1, 1, 2], 1));