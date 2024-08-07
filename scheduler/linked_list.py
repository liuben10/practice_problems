class LinkedList:

    class LNode:

        def __init__(self, val: int = None):
            self.val = val
            self.next = None

    def __init__(self):
        self.head = self.LNode()
        self.tail = self.head

    def add(self, elem):
        self.tail.next = self.LNode(elem)
        self.tail = self.tail.next

    def remove(self, idx = None) -> int: 
        if (self.tail == self.head):
            print("Trying to remove from empty list.")
            return None
        newIdx = 0
        it = self.head.next
        prev = self.head
        while ((idx is None or newIdx < idx ) and it.next != None):
            prev = it
            it = it.next
            newIdx += 1
        if (it == self.tail):
            self.tail = prev
        ret = it.val
        prev.next = it.next
        return ret

    def reverse(self):
        pass

    def hasCycle(self):
        pass

    def __str__(self):
        sb = ""
        it = self.head.next
        while(it != None):
            sb += f"{it.val}, "
            it = it.next
        return sb


if __name__ == '__main__':
    l = LinkedList()
    l.add(3)
    l.add(4)
    l.add(5)
    l.remove()
    l.remove()
    l.remove()
    print(l)