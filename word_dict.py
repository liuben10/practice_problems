class TNode:
    def __init__(self, val, isEnd=False):
        self.val = val
        self.next = {}
        self.isEnd = isEnd

class WordDict:
    def __init__(self):
        self.root = TNode("")
    
    def add(self, word):
        root = self.root
        for i in range(len(word)):
            if (word[i] in root.next):
                root = root.next[word[i]]
            else:
                root.next[word[i]] = TNode(word[i])
                root = root.next[word[i]]
                if (i == len(word)-1):
                    root.isEnd = True
    
    def searchH(self, root, word, idx):
        if (word[idx] not in root.next):
            return False
        if (idx == len(word)-1):
            return root.next[word[idx]].isEnd
        return self.searchH(root.next[word[idx]], word, idx+1)
    
    def search(self, word):
        return self.searchH(self.root, word, 0)
    
if __name__ == '__main__':
    wd = WordDict()
    wd.add("foo")
    wd.add("foobar")
    wd.add("refrigerator")
    wd.add("bobbywagner")
    print(wd.search("foobar"))