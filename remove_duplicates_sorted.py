from typing import Optional

# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def deleteDuplicates(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if (head is None):
            return None
        else:
            prev = None
            iter = head
            newhead = None
            while(iter != None):
                if (prev is None):
                    prev = iter
                    newhead = prev
                elif (iter.val != prev.val):
                    prev.next = iter
                    prev = iter
                iter = iter.next
            if (prev is not None):
                prev.next = None
            return newhead
        
if __name__ == '__main__':
    test_ll = ListNode(
        1,
        ListNode(1,
                 ListNode(2, ListNode(3, ListNode(3, None))))
    )
    s = Solution()
    res = s.deleteDuplicates(test_ll)
    print(res.val)
    print(res.next.val)
    print(res.next.next.val)