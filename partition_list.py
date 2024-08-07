from typing import List, Optional, Tuple

# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
class Solution:
    def partition(self, head: Optional[ListNode], x: int) -> Optional[ListNode]:
        smaller_bucket = ListNode()
        small_end = smaller_bucket
        larger_bucket = ListNode()
        larger_end = larger_bucket
        it = head
        while (it != None):
            if (it.val < x ):
                small_end.next = it
                small_end = small_end.next
            else:
                larger_end.next = it
                larger_end = larger_end.next
            it = it.next
        larger_end.next = None
        if (smaller_bucket.next is None):
            return larger_bucket.next
        small_end.next = larger_bucket.next
        return smaller_bucket.next

def create_list_nodes_from_pylist(pylist: List[int]) -> ListNode:
    res: ListNode= None
    ret = None
    for i in pylist:
        if (res == None):
            res = ListNode(i)
            ret = res
        else:
            res.next = ListNode(i)
            res = res.next
    return ret


def test_harness(test_in, test_x, expected_in):
    testl = create_list_nodes_from_pylist(test_in)
    s = Solution()
    test_p = s.partition(testl, test_x)
    it = test_p
    expected_l = create_list_nodes_from_pylist(expected_in)
    expect_it = expected_l
    while(it != None):
        print(f"{it.val},")
        it = it.next
    it = test_p
    while(it != None and expect_it != None):
        if (it.val == expect_it.val):
            it = it.next
            expect_it = expect_it.next
        else:
            return f"ERROR {test_in} with {test_x} did not match {expected_in}. {it.val} != {expect_it.val}"
    if (it != None or expect_it != None):
        return f"ERROR {test_in} with {test_x} did not match {expected_in}. Had more elements"
    return f"PASSED {test_in} with {test_x} matched {expected_in}"
    


    
if __name__ == '__main__':
    print(test_harness([1,4,3,2,5,2], 3, [1,2,2,4,3,5]))
    print(test_harness([10,3,1], 3, [1,10,3]))
    print(test_harness([11, 12, 9], 9, [11,12,9]))
    print(test_harness([2,1], 2, [1,2]))
    print(test_harness([9,8,7,6,10], 9, [8, 7, 6, 9,10]))
    print(test_harness([8,9,7,6,10], 7, [6,8,9,7,10]))
