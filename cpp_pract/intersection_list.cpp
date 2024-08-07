struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
   ListNode* findCycle(ListNode* head) {
        ListNode* sp = head;
        ListNode* fp = head;
        bool firstTimeCheck = true;
        while (sp != fp || firstTimeCheck) {
            firstTimeCheck = false;
            if (fp->next == nullptr || fp->next->next == nullptr) {
                return nullptr;
            } else {
                fp = fp->next->next;
            }
            sp = sp->next;
        }
        return sp;
    }
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        ListNode* it = headA;
        while(it->next != nullptr) {
            it = it->next;
        }
        ListNode* endOfA = it;
        it->next = headB;
        ListNode* cycleIntersect = findCycle(headA);
        if (cycleIntersect == nullptr) {
            endOfA->next = nullptr;
            return nullptr;
        }
        ListNode* headIt = headA;
        ListNode* cycleIter = cycleIntersect;
        while(headIt != cycleIter && cycleIter != nullptr && headIt != nullptr) {
            cycleIter = cycleIter->next;
            headIt = headIt->next;
        }

        endOfA->next = nullptr;
        return headIt;
    }
};