class Solution(object):
    def insertAndBump(self,nums1, i, elem):
        tmp = 0
        for niter in range(i, len(nums1)):
            if (niter == i):
                tmp = nums1[niter]
                nums1[niter] = elem
            else:
                newTemp = nums1[niter]
                nums1[niter] = tmp
                tmp = newTemp
    def merge(self,nums1, m, nums2, n):
        if (n == 0):
            return
        if (m == 0):
            for i in range(0,n):
                nums1[i] = nums2[i]
            return
        n1Pos = 0
        n2Pos = 0
        insertionPos = 0
        insertedFromN2 = 0
        while insertionPos < (m + n):
            if (n2Pos < len(nums2) and n1Pos < len(nums1) and nums1[n1Pos] > nums2[n2Pos]):
                nums1.insert(insertionPos, nums2[n2Pos])
                nums1.pop(len(nums1)-1)
                n2Pos += 1
                n1Pos = insertionPos + 1
                insertedFromN2 += 1
            else:
                if (n1Pos < (insertedFromN2 + m)):
                    n1Pos += 1
                elif n2Pos < n:
                    nums1.insert(insertionPos, nums2[n2Pos])
                    nums1.pop(len(nums1)-1)
                    n2Pos += 1
            insertionPos += 1

s = Solution()
res = [1,2,3,0,0,0]
s.merge(res, 3, [2,5,6], 3)
print(res)