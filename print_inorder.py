import heapq

class MultipleSortedTrav:
    def __init__(self, listOfLists):
        keyAndList = [(x[0], x) for x in listOfLists]
        heapq.heapify(keyAndList)
        self.listOfLists = keyAndList

    def pop(self):
        if (len(self.listOfLists) == 0):
            return None
        key, res = heapq.heappop(self.listOfLists)
        ans = res.pop(0)
        if (len(res)):
            newkey = res[0]
            heapq.heappush(self.listOfLists, (newkey, res))
        return ans
    
    def empty(self):
        return not len(self.listOfLists)
    


if __name__ == '__main__':
    m = MultipleSortedTrav(
        [[1,2,3,4,5,6,7,8],
        [4,5,6],
        [5]]
    )
    while(not m.empty()):
        print(m.pop())

