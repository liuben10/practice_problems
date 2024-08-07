class circularQueue:

    def __init__(self, capacity):
        self.size = 0
        self.capacity = capacity
        self.tail = 0
        self.head = 0
        self.buffer = [0 for i in range(capacity)]

    def add(self, elem):
        if (self.size < self.capacity):
            self.buffer[self.tail] = elem
            self.tail += 1
            self.tail = self.tail % self.capacity
            self.size += 1
        else:
            print("Queue at capacity")
    
    def pop(self):
        if (self.size == 0):
            return None
        res = self.buffer[self.head]
        self.head += 1
        self.head = self.head % self.capacity
        self.size -= 1
        return res
    
    def __str__(self):
        return f"buffer={self.buffer} head={self.head} tail={self.tail}"
    
if __name__ == '__main__':
    queue = circularQueue(5)
    queue.add(3)
    queue.add(4)
    queue.add(5)
    queue.add(6)
    queue.add(7)
    print(queue)
    print(queue.pop())
    print(queue)
    queue.add(10)
    print(queue)
    print(queue.pop())
    print(queue.pop())
    print(queue)
    queue.add(11)
    print(queue)

