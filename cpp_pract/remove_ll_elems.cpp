#include "list_utils.hpp"

/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:

    ListNode* removeElements(ListNode* head, int val) {
        ListNode* prev = nullptr;
        ListNode* hiter = head;
        ListNode* newHead = head;
        while(hiter != nullptr) {
            if (hiter->val == val) {
                if (prev != nullptr) {
                    prev->next = hiter->next;
                } else {
                    newHead = hiter->next;
                }
                hiter = hiter->next;
            } else {
                prev = hiter;
                hiter = hiter->next;
            }
        }
        return newHead;
    }
};